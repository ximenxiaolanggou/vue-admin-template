<template>
  <el-dialog v-model="visible" :show-close="false" width="580">
    <template #header="{ close, titleId, titleClass }">
      <el-tabs v-model="selectedTab" @tab-change="handleTabChange">
        <el-tab-pane :name="1" label="个人信息">
          <UserInfo ref="userInfoRef"/>
        </el-tab-pane>
        <el-tab-pane :name="2" label="密码修改">
          <ModifyPwd ref="modifyPwdRef"/>
        </el-tab-pane>
        <el-tab-pane :name="3" label="微信绑定">
          <UserBind/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="UserProfile">
import { ref } from 'vue'

import UserBind from "@/layout/admin/header/components/UserBind.vue";
import UserInfo from "@/layout/admin/header/components/UserInfo.vue";
import ModifyPwd from "@/layout/admin/header/components/ModifyPwd.vue";
import {MoreFilled} from "@element-plus/icons-vue";
const visible = ref(false)

let userInfoRef = ref()

let modifyPwdRef = ref()

let selectedTab = ref(1)

const handleColose = () => {
  visible.value = false
}

const handleOpen = () => {
  visible.value = true
  selectedTab.value = 1
}

const handleTabChange = (arg) => {
  switch (arg) {
    case 1:
      userInfoRef.value.reset()
      break
    case 2:
      modifyPwdRef.value.reset()
      break
    case 3:
      break
  }
}

defineExpose({
  handleColose,
  handleOpen,
})

</script>

<style scoped lang="scss">

</style>