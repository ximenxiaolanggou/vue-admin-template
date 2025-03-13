<template>
  <div class="admin-layout">
    <el-container>
      <el-aside :class="['aside', systemConfigurationStore.isCollapse ? 'fold' : '']">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header />
        </el-header>
        <el-main>
          <Main/>
        </el-main>
        <el-footer class="footer">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="AdminLayout">
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import Footer from './footer/index.vue'

import Main from './main/index.vue'

import useSystemConfigurationStore from '@/store/module/system/index.ts'

const systemConfigurationStore = useSystemConfigurationStore()
</script>

<style scoped lang="scss">
  .admin-layout {
    width: 100%;
    height: 100vh;
    display: flex;
    .aside {
      transition: all 0.3s;
      width: $base-menu-collapse-width;
      &.fold {
        width: $base-menu-width;
      }
    }
    .header {
      padding: 0;
      height: $base-header-height;
    }
    .footer {
      padding: 0;
      height: $base-footer-height;
    }
    .main {
      //transition: all 0.5s;
      width: calc(100vw -  $base-menu-width);
      .content {
        //height: calc(100vh - $base-header-height - $base-footer-height);
      }
    }
    .footer {

    }
  }
</style>