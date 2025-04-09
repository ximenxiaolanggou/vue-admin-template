<template>
  <div class="admin-layout-header">
    <div class="header-route">
      <svg @click="swithExpandHandle" class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhankai"></use>
      </svg>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            :to="item.path"
            v-show="item.path != '/'"
        >
              {{item.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-tool">
      <el-icon @click="refreshHandle" class="refresh"><component is="Refresh" /></el-icon>
      <el-icon @click="fullScreenHandle" class="full-screen"><component is="FullScreen" /></el-icon>
      <el-dropdown popper-class="custom-dropdown">
        <span class="el-dropdown-link">
          {{userStore.username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleUserCenter"><el-icon><User /></el-icon>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logoutHandle"><el-icon><TurnOff /></el-icon>登出用户</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <UserProfile ref="userProfileRef"/>
  </div>
</template>

<script setup lang="ts" name="Header">
import {ArrowRight, ArrowDown  } from "@element-plus/icons-vue";
import { useRoute, useRouter} from 'vue-router'
import useSystemConfigurationStore from '@/store/modules/system/index.ts'
import {logout} from "@/api/auth";
import useUserStore from "@/store/modules/user";
import UserProfile from "@/layout/admin/header/components/UserProfile.vue";
import {ref} from "vue";

const userProfileRef = ref()

let systemConfigurationStore = useSystemConfigurationStore();
const $route = useRoute();
const $router = useRouter();
const userStore = useUserStore();

// 刷新
const refreshHandle = () => {
  systemConfigurationStore.refresh = !systemConfigurationStore.refresh;
}


// 切换菜单展示和影藏
const swithExpandHandle = () => {
  systemConfigurationStore.switchMenuExpandStatus();
}

// 全屏 | 推出全屏
const fullScreenHandle = () => {
  let full = document.fullscreenElement;
  if(!full) {
    // 实现全屏
    document.documentElement.requestFullscreen();
  }else {
    // 退出全屏
    document.exitFullscreen();
  }
}

/**
 * 登出操作
 */
const logoutHandle = async () => {
  await logout();
  // 清除store
  await userStore.ResetUserInfo();
  // 清除 ls
  localStorage.clear();
  $router.push('/login');
}

/**
 * 个人中心事件
 */
const handleUserCenter = () => {
  userProfileRef.value.handleOpen()
}
</script>

<style scoped lang="scss">
  .admin-layout-header {
    margin: 0;
    height: 100%;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-route {
      display: flex;
      align-items: center;
      .icon {
        margin: 0 20px;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          transform: scale(1.2);
          transition: 0.3s;
        }
      }
    }
    .header-tool {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .refresh {
        border-radius: 50%;
        padding: 2px;
        font-size: 25px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          transform: scale(1.2);
          color: #6c6c6c;
          transition: 0.3s;
          background-color: #e7e6e6;
        }
      }
      .full-screen {
        border-radius: 50%;
        padding: 2px;
        font-size: 25px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          transform: scale(1.2);
          color: #6c6c6c;
          transition: 0.3s;
          background-color: #e7e6e6;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
  }

</style>