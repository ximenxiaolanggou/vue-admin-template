<template>
  <div class="main">
    <div class="table-container">
      <TableTip @refresh="handleRefresh" @batchDelete="handleBatchDeletepermission" @add="handleAddPermission" :metaData="tableTipData" class="tip"/>
      <el-table
          v-loading="isloading"
          :data="tableData"
          border
          row-key="id"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          class="table"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="sel" type="selection" width="40" />
        <el-table-column prop="name" label="权限名称"/>
        <el-table-column prop="code" label="权限标识"/>
        <el-table-column prop="zindex" label="权限权重"/>
        <el-table-column prop="menu" label="权限类型">
          <template #default="scope">
            <el-tag v-if="scope.row.menu == 1" type="primary">菜单</el-tag>
            <el-tag v-else-if="scope.row.menu == 2" type="success">按钮</el-tag>
            <el-tag v-else-if="scope.row.menu == 3" type="info">API</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="角色描述"/>
        <el-table-column prop="createtime" label="创建时间"/>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button @click="handleUpdatePermission(scope.row)" color="#626aef" :dark="false" plain>编辑</el-button>
            <el-popconfirm
                class="box-item"
                title="确定删除？"
                placement="bottom-end"
                @confirm="handleDeletePermission(scope.row)"
            >
              <template #reference>
                <el-button type="danger" :dark="false" plain>
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 权限添加 -->
    <PermissionAdd ref="permissionAddRef" :permissions="tableData" @submit="handleAddPermissionSubmit"/>
    <!-- 权限修改 -->
    <PermissionUpdate  ref="permissionUpdateRef" :permissions="tableData" :permission="selectedPermission" @submit="handleUpdatePermissionSubmit"/>
  </div>
</template>

<script setup lang="ts" name="User">
import {onMounted, reactive, ref} from "vue";
import type {PageCondition} from "@/types/Common.ts";
import {ElNotification} from "element-plus";
import type {Permission} from "@/types/permission.ts";
import {batchDeletePermissionAPI, deletePermissionAPI, permissionTreeAPI, updatePermissionAPI} from "@/api/system/permission";
import PermissionAdd from "@/views/system/permission/components/PermissionAdd.vue";
import PermissionUpdate from "@/views/system/permission/components/PermissionUpdate.vue";

const tableTipData  = ref({
  tip: '权限列表',
  bgcolor: '#fff',
})

const permissionAddRef = ref()

const permissionUpdateRef = ref()

const treeProps = reactive({
  children: 'children',
})

/**
 * 分页信息
 */
let pageInfo = ref<PageCondition>({
  pageNumber: 1,
  pageSize: 10,
})

let selectedPermission = ref<permission>({})


let isloading = ref(false)

let tableData = ref<Permission[]>([])

// 批量删除选中的用户集合
let deleteSelectedPermission = ref<Permission[]>([])

/**
 * 获取权限树
 */
const getPermissionTree = async () => {
  isloading.value = true
  const permissionRes = await permissionTreeAPI()
  tableData.value = permissionRes.data
  isloading.value = false
}

/**
 * 选中切换事件
 */
const handleSelectionChange = (permissions: Permission[]) => {
  deleteSelectedPermission.value = permissions
}

/**
 * 权限更新提交事件
 */
const handleUpdatePermissionSubmit = () => {
  getPermissionTree()
}

/**
 * 刷新事件
 */
const handleRefresh = () => {
  getPermissionTree()
}

/**
 * 添加权限 - 事件
 */
const handleAddPermission = () => {
  permissionAddRef.value.handleOpen()
}

/**
 * 添加权限 - 提交事件
 */
const handleAddPermissionSubmit = () => {
  getPermissionTree()
}

/**
 * 权限更新事件
 */
const handleUpdatePermission = (permission: Permission) => {
  selectedPermission.value = permission
  permissionUpdateRef.value.handleOpen()
}

/**
 * 批量删除事件
 */
const handleBatchDeletepermission = async () => {
  if(deleteSelectedPermission.value.length == 0){
    ElNotification({
      title: 'Warning',
      message: '请选择需要删除的权限',
      type: 'warning',
    })
    return;
  }
  await batchDeletePermissionAPI(deleteSelectedPermission.value.map(permission => permission.id))
  ElNotification({
    title: 'Success',
    message: '批量删除成功',
    type: 'success',
  })
  getPermissionTree()
}

/**
 * 删除权限
 */
const handleDeletePermission = async ({id}) => {
  await deletePermissionAPI(id)
  ElNotification({
    title: 'Success',
    message: '删除成功',
    type: 'success',
  })
  getPermissionTree()
}


onMounted(() => {
  getPermissionTree()
})

</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table-container {
    flex-grow: 1;
    border-radius: 8px;
    background: #fff;
    padding: 10px;
    min-height: 250px;
    .table {
      height: calc(100% - 50px);
      margin-top: 10px;
    }
  }
}

.first-header-row {
  color: #3967FF;
  text-align: center;
}

:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>