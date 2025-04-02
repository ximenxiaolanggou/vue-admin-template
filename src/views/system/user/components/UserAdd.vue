<template>
  <el-drawer size="400" v-model="visible" :direction="direction" :before-close="handleClose">
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        require-asterisk-position="right"
      >
        <el-form-item label="用户名" label-position="top" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="性别" label-position="top" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :value="1">男</el-radio>
            <el-radio :value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" label-position="top" prop="mail">
          <el-input v-model="formData.mail" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="手机号" label-position="top" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="角色" label-position="top" prop="roleIds">
          <el-select multiple v-model="formData.roleIds" placeholder="请选择角色">
            <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserAdd">
import {onMounted, reactive, ref} from 'vue'
import {type DrawerProps, ElMessageBox, ElNotification, type FormInstance, type FormRules} from 'element-plus'
import type {User} from "@/types/user.ts";
import {listAPI as roleListAPI} from "@/api/system/role";
import type {Role} from "@/types/role.ts";
import {addUserAPI} from "@/api/system/user";

const direction = ref<DrawerProps['direction']>('rtl')
let visible = ref(false)
const $emits = defineEmits(['close', 'submit'])
const formRef = ref<FormInstance>()

let roles = ref<Role[]>([])

let formData = reactive<User>({
  gender: 1,
  roleIds: []
})

const formRules = reactive<FormRules<User>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '名字2-10之间', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],
  mail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ]
})


/**
 * 关闭 - 有提示
 */
const handleClose = () => {
  ElMessageBox.confirm('确定退出？')
      .then(() => {
        visible.value = false
      })
      .catch(() => {
        // catch error
      })
}

/**
 * 关闭无提示
 */
const handleSubmitClose = () => {
  visible.value = false
}

const handleOpen = () => {
  formRef.value?.resetFields()
  visible.value = true
}

/**
 * 提交事件
 * @param formEl
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await addUserAPI(formData)
      ElNotification({
        title: 'Success',
        message: '添加成功',
        type: 'success',
      })
      visible.value = false
      $emits('submit')
    }
  })
}

/**
 * 获取角色列表
 */
const getRoleList = async () => {
  const res = await roleListAPI()
  roles.value = res.data
}

onMounted(() => {
  getRoleList()
})

defineExpose({handleClose, handleOpen})

</script>

<style scoped lang="scss">

</style>