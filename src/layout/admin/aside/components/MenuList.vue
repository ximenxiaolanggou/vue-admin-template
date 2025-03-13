<template>
  <template v-for="routeObj in routes" :key="routeObj.path">

    <!-- 没有子菜单 - 判断状态 -->
    <el-menu-item
        v-if="!routeObj.children && routeObj.meta && !routeObj.meta.hidden"
        :index="routeObj.path">
      <el-icon><component :is="routeObj.meta.icon" /></el-icon>
      <template #title>{{routeObj.meta.title}}</template>
    </el-menu-item>

    <!-- 只有一个子菜单 &&  第一层菜单 -> 直接展示 -->
    <el-menu-item
        v-if="routeObj.children && routeObj.children.length == 1 && firstLevel && routeObj.children[0].meta && !routeObj.children[0].meta.hidden"
        :index="routeObj.path">
      <el-icon><component :is="routeObj.children[0].meta.icon" /></el-icon>
      <template #title>{{routeObj.children[0].meta && routeObj.children[0].meta.title}}</template>
    </el-menu-item>

    <!-- 多个子菜单 || (只有一个子菜单 &&  不第一层菜单) -->
    <el-sub-menu
        v-if="
          (routeObj.children && routeObj.children.length == 1 && !firstLevel && routeObj.children[0].meta && !routeObj.children[0].meta.hidden)
          ||
          ( routeObj.children && routeObj.children.length > 1)"
        :index="routeObj.path"
    >
      <template #title>
        <el-icon><component :is="routeObj.meta.icon" /></el-icon>
        <span>{{routeObj.meta && routeObj.meta.title}}</span>
      </template>
      <MenuList :routes="routeObj.children"/>
    </el-sub-menu>

  </template>
</template>

<script setup lang="ts" name="MenuList">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,} from "@element-plus/icons-vue";

defineProps(['routes','firstLevel'])

</script>

<style scoped lang="scss">

</style>