<template>
  <div class="main">
    <SearchTool class="search-tool" @search="searchHandle"/>
    <div class="table-container">
      <TableTip @refresh="handleRefresh" @batchDelete="handleBatchDeleteRole" @add="handleRoleRole" :metaData="tableTipData" class="tip"/>
      <el-table
          v-loading="isloading"
          :data="tableData"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          class="table"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="sel" type="selection" width="40" />
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="description" label="角色描述"/>
        <el-table-column prop="createtime" label="创建时间"/>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button @click="handleUpdateRole(scope.row)" color="#626aef" :dark="false" plain>编辑</el-button>
            <el-popconfirm
                class="box-item"
                title="确定删除？"
                placement="bottom-end"
                @confirm="handleDeleteRole(scope.row)"
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
      <div class="pagination">
        <el-pagination
            v-model:current-page="pageInfo.pageNumber"
            v-model:page-size="pageInfo.pageSize"
            layout="total, prev, pager, next, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 角色添加 -->
    <RoleAdd ref="roleAddRef" @submit="handleAddRoleSubmit"/>
    <!-- 角色修改 -->
    <RoleUpdate ref="roleUpdateRef" :role="selectedRole" @submit="handleUpdateRoleSubmit"/>
  </div>
</template>

<script setup lang="ts" name="User">
import SearchTool from "@/views/system/role/components/SearchTool.vue";
import {onMounted, reactive, ref} from "vue";
import type {PageCondition} from "@/types/Common.ts";
import {batchDeleteRoleAPI, deleteRoleAPI, pageAPI} from "@/api/system/role";
import {ElNotification} from "element-plus";
import type {Role} from "@/types/role.ts";
import RoleAdd from "@/views/system/role/components/RoleAdd.vue";
import RoleUpdate from "@/views/system/role/components/RoleUpdate.vue";
const tableTipData  = ref({
  tip: '角色列表',
  bgcolor: '#fff',
})

const roleAddRef = ref()

const roleUpdateRef = ref()

/**
 * 分页信息
 */
let pageInfo = ref<PageCondition>({
  pageNumber: 1,
  pageSize: 10,
})

let selectedRole = ref<Role>({})

let searchCondition = ref<Role>({})

let total = ref<number>(0);


let isloading = ref(false)

let tableData = ref<Role[]>([])

// 批量删除选中的用户集合
let deleteSelectedRole = ref<Role[]>([])

/**
 * 用户列表
 */

const rolePage = async (searchCondition:Role, pageCondition:PageCondition) => {
  isloading.value = true
  const pageRes = await pageAPI(searchCondition, pageCondition)
  tableData.value = pageRes.data.data
  total.value = pageRes.data.total
  isloading.value = false
}

/**
 * 用户添加事件
 */
const handleRoleRole = () => {
  roleAddRef.value.handleOpen()
}

/**
 * 选中切换事件
 * @param val
 */
const handleSelectionChange = (users: User[]) => {
  deleteSelectedRole.value = users
}

/**
 * 查询事件
 */
const searchHandle = (searchData: Role) => {
  pageInfo.value.pageNumber = 1
  searchCondition.value = searchData
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 角色添加提交事件
 */
const handleAddRoleSubmit = () => {
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 角色编辑事件
 * @param role
 */
const handleUpdateRole = (role:Role) => {
  selectedRole.value = role
  roleUpdateRef.value.handleOpen()
}

/**
 * 角色更新提交事件
 */
const handleUpdateRoleSubmit = () => {
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 刷新事件
 */
const handleRefresh = () => {
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 页码变化
 */
const handleSizeChange = () => {
  pageInfo.value.pageNumber = 1
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 页条数变化
 */
const handleCurrentChange = () => {
  rolePage(searchCondition.value, pageInfo.value)
}


/**
 * 批量删除用户
 */
const handleBatchDeleteRole = async () => {
  if(deleteSelectedRole.value.length == 0){
    ElNotification({
      title: 'Warning',
      message: '请选择需要删除的角色',
      type: 'warning',
    })
    return;
  }
  await batchDeleteRoleAPI(deleteSelectedRole.value.map(role => role.id))
  ElNotification({
    title: 'Success',
    message: '批量删除成功',
    type: 'success',
  })
  rolePage(searchCondition.value, pageInfo.value)
}

/**
 * 删除角色
 * @param id
 */
const handleDeleteRole = async ({id}) => {
  await deleteRoleAPI(id)
  ElNotification({
    title: 'Success',
    message: '删除成功',
    type: 'success',
  })
  rolePage(searchCondition.value, pageInfo.value)
}

onMounted(() => {
  rolePage(null, pageInfo.value)
})

</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  .search-tool {
    //background-color: #fff;
  }
  .table-container {
    flex-grow: 1;
    border-radius: 8px;
    background: #fff;
    padding: 10px;
    margin-top: 20px;
    min-height: 250px;
    .table {
      height: calc(100% - 100px);
      margin-top: 10px;
    }
    .pagination {
      margin-top: 10px;
      height: 40px;
      display: flex;
      justify-content: end;
      align-items: center;
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