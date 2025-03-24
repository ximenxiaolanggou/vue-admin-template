<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div class="route" :key="$route.path" v-if="flag">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>

</template>

<script setup lang="ts" name="Main">
import useSystemConfigurationStore from '@/store/modules/system/index.ts'
import {nextTick, onBeforeUpdate, onMounted, ref, watch} from "vue";
import { useRoute } from 'vue-router'
const $route = useRoute();
let systemConfigurationStore = useSystemConfigurationStore()

let flag = ref(true);


// 监听刷新
watch(() => systemConfigurationStore.refresh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
})

</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  //transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
  //transform: scale(1);
}
.route {
  height: 100%;
}
</style>