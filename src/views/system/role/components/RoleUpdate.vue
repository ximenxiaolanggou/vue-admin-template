<template>
  <el-drawer size="400" v-model="visible" :direction="direction" :before-close="handleClose">
    <template #header>
      <h4>修改用户</h4>
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
              :props="treeProps"
              :data="permissions"
              show-checkbox
              node-key="id"
              style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      {{formData}}
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="RoleUpdate">
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import {
  type DrawerProps,
  ElMessageBox,
  ElNotification,
  type FormInstance,
  type FormRules,
  type TreeInstance
} from 'element-plus'
import type {Role} from "@/types/role.ts";
import {updateRoleAPI} from "@/api/system/role";
import type {Permission} from "@/types/permission.ts";
import {permissionTreeAPI} from "@/api/system/permission";

const direction = ref<DrawerProps['direction']>('rtl')
let visible = ref(false)
const $emits = defineEmits(['close', 'submit'])
const formRef = ref<FormInstance>()

const treeRef = ref<TreeInstance>()

const props = defineProps(['role'])


let formData = reactive<Role>({})

let permissions = ref<Permission[]>([])

/**
 * 闭合树节点
 */
const unExpandTreeNodes = () => {
  const nodes = treeRef.value.store._getAllNodes(); // 获取所有节点
  nodes.forEach(node => {
    node.expanded = false; // 设置节点展开状态
  });
}

/**
 * 设置树选中节点
 */
const setTreeSelected = () => {
  // 闭合节点
  unExpandTreeNodes()
  // 清空之前
  treeRef.value.setCheckedKeys([])
  // 默认选中
  if (formData.permissionIds && formData.permissionIds.length > 0) {

    formData.permissionIds.forEach(key => {
      const node = treeRef.value.getNode(key);
      console.log('half11')

      if (node.isLeaf) {
        console.log('half')
        treeRef.value.setChecked(node, true); // 仅选中叶子节点
      }
    })
  }
}

watch(() => props.role, (role:Role) => {
  formData.id = role.id
  formData.name = role.name
  formData.description = role.description
  formData.permissionIds = role.permissions?.map(permission => permission.id)

})

watch(() => visible.value, (nVal) => {
  // 显示的时候设置选中
  // 清空
  if(nVal) {
   nextTick(() =>  setTreeSelected())
  }
})

const formRules = reactive<FormRules<Role>>({
  username: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
})

const treeProps = {
  label: 'name',
  children: 'children',
}

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
      // 1. 获取全选节点的 keys（包括被自动勾选的父节点）
      const checkedKeys = treeRef.value.getCheckedKeys(false); // 参数 false 表示包含父节点
      // 2. 获取半选父节点的 keys（部分子节点被选中时）
      const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
      // 3. 合并结果（去重）
      const allSelectedKeys = [...new Set([...checkedKeys, ...halfCheckedKeys])];
      formData.permissionIds = allSelectedKeys
      await updateRoleAPI(formData)
      ElNotification({
        title: 'Success',
        message: '修改成功',
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

onMounted( () => {
  getPermissionTree()
})

defineExpose({handleClose, handleOpen})

</script>

<style scoped lang="scss">

</style>