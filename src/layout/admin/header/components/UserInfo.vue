<template>
  <div class="userinfo-container">
    <el-upload
        class="avatar-uploader"
        :action="UserAPI.uploadAvatarURL"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
    >
      <img v-if="userStore.avatar" :src="formData.avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-form
        class="form"
        label-width="auto"
        ref="formRef"
        :model="formData"
    >
      <el-form-item label="用户名">
        <el-input v-model="formData.username" class="custom-input" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="formData.mobile" class="custom-input" placeholder="请输入手机号" disabled/>
      </el-form-item>
      <el-form-item class="custom-input" label="邮箱">
        <el-input v-model="formData.mail" class="custom-input" placeholder="请输入手机号" disabled/>
      </el-form-item>
      <el-form-item class="custom-input" label="性别">
        <el-radio-group v-model="formData.gender">
          <el-radio :value="1">男</el-radio>
          <el-radio :value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="display: flex;justify-content: end;margin-top: 10px">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="UserInfo">
import {reactive, ref, watch} from 'vue'
import {ElMessage, ElNotification, type FormInstance} from 'element-plus'
import {Plus, Upload} from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import useUserStore from "@/store/modules/user";
import type {User} from "@/types/user.ts";

import {API as UserAPI} from "@/api/system/user";
import {tokenValue} from "@/contants/token.ts";
import {personalInfoAPI} from "@/api/auth";

const userStore = useUserStore()

const formRef = ref<FormInstance>()

const imageUrl = ref('')

const headers = ref({
  'Authorization': `bearer ${localStorage.getItem(tokenValue)}`
})

let formData = reactive<User>({
  id: userStore.id,
  username: userStore.username,
  mail: userStore.mail,
  mobile: userStore.mobile,
  gender: userStore.gender,
  avatar: userStore.avatar,
})


const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  console.log(response)
  console.log(uploadFile)
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(URL.createObjectURL(uploadFile.raw!))
  formData.avatar = `${import.meta.env.VITE_APP_STATIC_API}/avatars/${response.data}`
  // 更新用户信息
  userStore.UpdateUserAvatar(formData.avatar)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('fileType', rawFile.type)
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif' ) {
    ElMessage.error('只支持图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('最大2M!')
    return false
  }
  return true
}

/**
 * 保存事件
 */
const handleSubmit = async () => {
  if(!formData.username?.trim()) {
    ElNotification({
      title: 'Warning',
      message: '请输入用户名',
      type: 'warning',
    })
    return
  }
  if(!formData.gender) {
    ElNotification({
      title: 'Warning',
      message: '请选择性别',
      type: 'warning',
    })
    return
  }
  await personalInfoAPI({username: formData.username, gender: formData.gender})
  ElNotification({
    title: 'Success',
    message: '操作成功',
    type: 'success',
  })
}

const reset = () => {
      formData.id = userStore.id
      formData.username = userStore.username
      formData.mail = userStore.mail
      formData.mobile = userStore.mobile
      formData.gender = userStore.gender
      formData.avatar = userStore.avatar
}

defineExpose({reset})

</script>

<style scoped lang="scss">
.userinfo-container {
  display: flex;
  align-items: center;
  .avatar-uploader {
    .avatar {
      width: 160px;
      height: 160px;
      display: block;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 160px;
      height: 160px;
      text-align: center;
    }
  }
  .form {
    margin-left: 30px;
    flex-grow: 1;
  }

}
.form {
  .uploader-container {
   display: flex;
    flex-direction: column;
    .btn-uploader {
      margin: 10px 0;
      width: 100px;
      &:hover {
        background-color: #fff;
      }
    }
  }
}

.el-input {
  background: #fff;
  border: 0px !important;
}

:deep(.custom-input .el-input__wrapper) {
  background: #fff;
  border-bottom: 1px solid #cdcbcb;
  border-radius: 0;
  box-shadow: none !important;
}

:deep(.custom-input .el-select__wrapper) {
  background: #fff;
  border-bottom: 1px solid #cdcbcb;
  border-radius: 0;
  box-shadow: none !important;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

</style>