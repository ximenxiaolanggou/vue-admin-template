<template>
  <el-drawer size="400" v-model="visible" :direction="direction" :before-close="handleClose">
    <template #header>
      <h4>添加角色</h4>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        require-asterisk-position="right"
      >
        <el-form-item label="角色名称" label-position="top" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="角色描述" label-position="top" prop="description">
          <el-input v-model="formData.description" placeholder="请输入角色描述"/>
        </el-form-item>
        <el-form-item label="权限信息" label-position="top" prop="permissions">
          <el-tree
              ref="treeRef"
              :props="props"
              :data="permissions"
              show-checkbox
              node-key="id"
          />
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

<script setup lang="ts" name="RoleAdd">
import {onMounted, reactive, ref} from 'vue'
import {
  type DrawerProps,
  ElMessageBox,
  ElNotification,
  type FormInstance,
  type FormRules,
  type TreeInstance
} from 'element-plus'
import type {Role} from "@/types/role.ts";
import {addRoleAPI} from "@/api/system/role";
import {permissionTreeAPI} from "@/api/system/permission";
import type {Permission} from "@/types/permission.ts";

const direction = ref<DrawerProps['direction']>('rtl')
let visible = ref(false)
const $emits = defineEmits(['close', 'submit'])
const formRef = ref<FormInstance>()

let formData = reactive<Role>({
})

const treeRef = ref<TreeInstance>()

const props = {
  label: 'name',
  children: 'children',
}

let permissions = ref<Permission[]>([])

const formRules = reactive<FormRules<Role>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
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
      // 获取选中权限
      // 1. 获取全选节点的 keys（包括被自动勾选的父节点）
      const checkedKeys = treeRef.value.getCheckedKeys(false); // 参数 false 表示包含父节点
      // 2. 获取半选父节点的 keys（部分子节点被选中时）
      const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
      // 3. 合并结果（去重）
      const allSelectedKeys = [...new Set([...checkedKeys, ...halfCheckedKeys])];
      formData.permissionIds = allSelectedKeys
      await addRoleAPI(formData)
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
 * 获取权限树
 */
const getPermissionTree = async () => {
  const permissionRes = await permissionTreeAPI()
  permissions.value = permissionRes.data
}

onMounted(() => {
  getPermissionTree()
})


defineExpose({handleClose, handleOpen})

</script>

<style scoped lang="scss">

</style>