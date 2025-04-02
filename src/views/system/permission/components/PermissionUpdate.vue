<template>
  <el-drawer size="400" v-model="visible" :direction="direction" :before-close="handleClose">
    <template #header>
      <h4>权限修改</h4>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        require-asterisk-position="right"
      >
        <el-form-item label="名称" label-position="top" prop="name">
          <el-input v-model="formData.name" placeholder="请输入权限名称"/>
        </el-form-item>
        <el-form-item label="标识" label-position="top" prop="code">
          <el-input v-model="formData.code" placeholder="请输入权限标识"/>
        </el-form-item>
        <el-form-item label="描述" label-position="top" prop="description">
          <el-input v-model="formData.description" placeholder="请输入权限描述"/>
        </el-form-item>
        <el-form-item label="权重" label-position="top" prop="zindex" >
          <el-input-number :min="0" style="width: 100%" v-model="formData.zindex" placeholder="请输入权限权重"/>
        </el-form-item>
        <el-form-item label="类型" label-position="top" prop="menu">
          <el-radio-group v-model="formData.menu">
            <el-radio :value="1">菜单</el-radio>
            <el-radio :value="2">按钮</el-radio>
            <el-radio :value="3">API</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父节点" label-position="top" prop="pid">
          <el-tree-select
              @clear="handleClear"
              v-model="formData.pid"
              :data="permissions"
              check-strictly
              :render-after-expand="false"
              placeholder="请选择父节点"
              clearable
              :props="{
                label: 'name',  // 将显示文本字段映射为数据的 'name' 属性
                value: 'id',    // 将值字段映射为数据的 'id' 属性
                children: 'children' // 子节点字段名（默认是 'children'，可省略）
              }"
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

<script setup lang="ts" name="PermissionUpdate">
import {onMounted, reactive, ref, watch} from 'vue'
import {type DrawerProps, ElMessageBox, ElNotification, type FormInstance, type FormRules} from 'element-plus'
import {Permission} from "@/types/permission.ts";
import {updatePermissionAPI} from "@/api/system/permission";

const direction = ref<DrawerProps['direction']>('rtl')
let visible = ref(false)
const $emits = defineEmits(['close', 'submit'])
const formRef = ref<FormInstance>()

const props = defineProps(['permission', 'permissions'])

let roles = ref<Permission[]>([])

let formData = reactive<Permission>({})

watch(() => props.permission, (permission:Permission) => {
  formData.id = permission.id
  formData.name = permission.name
  formData.code = permission.code
  formData.description = permission.description
  formData.zindex = permission.zindex
  formData.menu = permission.menu
  formData.pid = permission.pid || null // 当父节点为0时候，清空0显示
})

const formRules = reactive<FormRules<Permission>>({
  name: [
    { required: true, message: '请输权限名称', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输权限标识', trigger: 'blur' },
  ],

})

/**
 * 清空事件
 */
const handleClear = () => {
  // 不向后端传递pid参数使用后端默认值（如果传递为null，会覆盖后端实体中的默认值）
  delete formData.pid
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
      await updatePermissionAPI(formData)
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

onMounted(() => {
})

defineExpose({handleClose, handleOpen})

</script>

<style scoped lang="scss">

</style>