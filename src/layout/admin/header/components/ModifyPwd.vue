<template>
  <el-form
      class="form"
      label-width="auto"
      ref="formRef"
      :model="formData"
      :rules="formRules"
  >
    <el-form-item label="旧密码" prop="oldPwd">
      <el-input v-model="formData.oldPwd" autocomplete="new-password" type="password" class="custom-input" placeholder="请输入旧密码"/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input v-model="formData.newPwd" autocomplete="new-password" type="password" class="custom-input" placeholder="请输入新密码"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="repeatPwd">
      <el-input v-model="formData.repeatPwd" autocomplete="new-password" type="password" class="custom-input" placeholder="请输入确认密码"/>
    </el-form-item>
    <div style="display: flex;justify-content: end;margin-top: 10px">
      <el-button type="primary" @click="handleSubmit(formRef)">保存</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="ModifyPwd">
import {reactive, ref} from "vue";
import {ElNotification, type FormInstance, type FormRules} from "element-plus";
import {addUserAPI} from "@/api/system/user";
import {logout, updatePwdAPI} from "@/api/auth";
import useUserStore from "@/store/modules/user";
import {useRouter} from "vue-router";

const userStore = useUserStore();

const $router = useRouter();

const formRef = ref<FormInstance>()
let formData = reactive<{newPwd: string, oldPwd: string, repeatPwd:string}>({
  newPwd: '',
  oldPwd: '',
  repeatPwd: '',
})

/**
 * 新密码校验
 */
const newPwdValidator = (rule, value, callback) => {
  if(formData.repeatPwd) {
    formRef.value.validateField('repeatPwd');
  }
  callback()
}

/**
 * 重复密码校验
 */
const repeatPwdValidator = (rule, value, callback) => {
  if(!value || !value.trim()) {
    callback(new Error('请输入确认密码'));
    return
  }
  if(formData.newPwd != value) {
    callback(new Error('两次密码不一致'));
    return
  }
  callback()
}

const formRules = reactive<FormRules<{newPwd: string, oldPwd: string, repeatPwd:string}>>({
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {validator: newPwdValidator, trigger: 'blur'}
  ],
  repeatPwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {validator: repeatPwdValidator, trigger: 'blur'}
  ],
})

/**
 * 保存事件
 */
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
     await updatePwdAPI({oldPwd: formData.oldPwd, newPwd: formData.newPwd})
      ElNotification({
        title: 'Success',
        message: '修改成功',
        type: 'success',
      })
      await logout();
      // 清除store
      await userStore.ResetUserInfo();
      // 清除 ls
      localStorage.clear();
      $router.push('/login');
    }
  })
}

const reset = () => {
  formRef.value?.resetFields()
}

defineExpose({reset})

</script>

<style scoped lang="scss">
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
</style>