<template>
  <div class="admin-layout-aside">
    <div class="banner">
      <img src="@/assets/banner.svg">
      <span v-if="systemConfigurationStore.isCollapse">星曜台</span>
    </div>
    <el-scrollbar class="menu-scrollbar">
      <el-menu
        default-active="2"
        class="menu"
        :collapse="!systemConfigurationStore.isCollapse"
        active-text-color="rgb(16 185 129)"
        :router="true"
        :defaultActive="$route.path"
      >
        <MenuList :routes="userStore.routes" :first-level="true"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Aside">
import MenuList from './components/MenuList.vue'
import { useRoute } from 'vue-router'

import useSystemConfigurationStore from '@/store/modules/system/index.ts'
import useUserStore from "@/store/modules/user";
const $route = useRoute();

import {onMounted, ref} from 'vue'
const systemConfigurationStore = useSystemConfigurationStore()
const userStore = useUserStore()


onMounted(() => {

})

</script>

<style>
  .admin-layout-aside {
    overflow: hidden;
    height: 100%;
    background-color: #fff;
    .banner {
      line-height: 60px;
      height: 60px;
      text-align: center;
      vertical-align: middle;
      img {
        line-height: 60px;
        vertical-align: middle;
      }
      span {
        font-weight: 700;
        font-size: 18px;
        color: #2C3231;
        letter-spacing: 1.5px;
        margin-left: 10px;
        line-height: 60px;
        height: 60px;
        vertical-align: middle;
      }
    }
    .menu-scrollbar {
      border-right: 0px;
      width: 100%;
      .el-menu {
        border-right: none;/**去除默认样式**/
      }
      .menu {
        width:100%;
      }
    }
  }

</style>
