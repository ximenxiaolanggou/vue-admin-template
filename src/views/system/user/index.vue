<template>
  <div class="main">
    <SearchTool class="search-tool" @search="searchHandle"/>
    <div class="table-container">
      <TableTip @refresh="handleRefresh" @batchDelete="handleBatchDeleteUser" @add="handleAddUser" :metaData="tableTipData" class="tip"/>
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
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="mobile" label="手机号"/>
          <el-table-column prop="mail" label="邮箱" />
          <el-table-column prop="gender" label="性别">
            <template #default="scope">
              {{scope.row.gender == '1' ? '男' : '女'}}
            </template>
          </el-table-column>
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            {{scope.row.roles && scope.row.roles.map(role => role.name).join(',')}}
          </template>
        </el-table-column>
          <el-table-column prop="createtime" label="创建时间"/>
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
              <el-button @click="handleUpdateUser(scope.row)" color="#626aef" :dark="false" plain>编辑</el-button>
              <el-popconfirm
                  class="box-item"
                  title="确定删除？"
                  placement="bottom-end"
                  @confirm="handleDeleteUser(scope.row)"
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
    <!-- 用户添加 -->
    <UserAdd ref="userAddRef" @submit="handleAddUserSubmit"/>
    <!-- 修改添加 -->
    <UserUpdate ref="userUpdateRef" :user="editSelectedUser" @submit="handleUpdateUserSubmit" />
  </div>
</template>

<script setup lang="ts" name="User">
import SearchTool from "@/views/system/user/components/SearchTool.vue";
import {onMounted, reactive, ref} from "vue";
import type {PageCondition} from "@/types/Common.ts";
import {batchDeleteUserAPI, deleteUserAPI, pageAPI} from "@/api/system/user";
import type {User} from "@/types/user.ts";
import UserAdd from "@/views/system/user/components/UserAdd.vue";
import UserUpdate from "@/views/system/user/components/UserUpdate.vue";
import {ElNotification} from "element-plus";

const tableTipData  = ref({
  tip: '用户列表',
  bgcolor: '#fff',
})

let isloading = ref(false)

let tableData = ref<User[]>()

let userAddRef = ref()
let userUpdateRef = ref()

// 编辑选中的用户
let editSelectedUser = ref<User>({})

// 批量删除选中的用户集合
let deleteSelectedUser = ref<User[]>([])

/**
 * 查询条件
 */
let searchCondition = ref<User>()

/**
 * 分页信息
 */
let pageInfo = ref<PageCondition>({
  pageNumber: 1,
  pageSize: 10,
})

let total = ref<number>(0);


/**
 * 添加用户
 */
const handleAddUser = () => {
  userAddRef.value.handleOpen()
}

/**
 * 删除
 */
const handleClick = () => {

}

/**
 * 用户分页
 */
const userPage = async (data: User, pageCondition: PageCondition) => {
  isloading.value = true
  const userPageRes = await pageAPI(data, pageCondition)
  tableData.value = userPageRes.data.data
  total.value = userPageRes.data.total
  isloading.value = false
}
/**
 * 页码变化
 */
const handleSizeChange = () => {
  pageInfo.value.pageNumber = 1
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 页条数变化
 */
const handleCurrentChange = () => {
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 查询事件
 * @param data
 */
const searchHandle = (data: User) => {
  pageInfo.value.pageNumber = 1
  searchCondition.value = data
  userPage(data, pageInfo.value)
}

/**
 * 用户添加 - 提交事件
 */
const handleAddUserSubmit = () => {
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 更新用户事件
 */
const handleUpdateUser = (user:User) => {
  editSelectedUser.value = user
  userUpdateRef.value.handleOpen()
}


/**
 * 更新用户提交事件
 */
const handleUpdateUserSubmit = () => {
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 删除用户
 * @param id
 */
const handleDeleteUser = async ({id}) => {
  await deleteUserAPI(id)
  ElNotification({
    title: 'Success',
    message: '删除成功',
    type: 'success',
  })
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 选中切换事件
 * @param val
 */
const handleSelectionChange = (users: User[]) => {
  deleteSelectedUser.value = users
}

/**
 * 批量删除用户
 */
const handleBatchDeleteUser = async () => {
  if(deleteSelectedUser.value.length == 0){
    ElNotification({
      title: 'Warning',
      message: '请选择需要删除的用户',
      type: 'warning',
    })
    return;
  }
  await batchDeleteUserAPI(deleteSelectedUser.value.map(user => user.id))
  ElNotification({
    title: 'Success',
    message: '批量删除成功',
    type: 'success',
  })
  userPage(searchCondition.value, pageInfo.value)
}

/**
 * 刷新事件
 */
const handleRefresh = () => {
  userPage(searchCondition.value, pageInfo.value)
}

onMounted(() => {
  userPage(null, pageInfo.value)
})

</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  .search-tool {
    background-color: #fff;
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