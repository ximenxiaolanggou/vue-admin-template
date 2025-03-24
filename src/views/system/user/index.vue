<template>
  <div class="main">
    <SearchTool/>
    <div class="table-container">
      <TableTip class="tip"/>
      <el-table
          :data="tableData"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          class="table"
      >
          <el-table-column type="selection" width="40" />
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="mobile" label="手机号"/>
          <el-table-column prop="mail" label="邮箱" />
          <el-table-column prop="gender" label="性别" />
          <el-table-column prop="createtime" label="创建时间"/>
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default>
              <el-button @click="" color="#626aef" :dark="false" plain>编辑</el-button>
              <el-button type="danger" :dark="false" plain  @click="handleClick">
                删除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage3"
            v-model:page-size="pageSize3"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, prev, pager, next, sizes"
            :total="1000"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="User">
import SearchTool from "@/views/system/user/components/SearchTool.vue";
import {ref} from "vue";
import {Plus} from "@element-plus/icons-vue";

const tableTipData  = ref({
  tip: '用户列表',
  bgcolor: '#fff',
})

const tableData = [
  {
    id: '1',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '2',
    username: '李四',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '3',
    username: '王五',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '4',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '5',
    username: '李四',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '6',
    username: '王五',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '7',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '8',
    username: '李四',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '9',
    username: '王五',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '10',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '6',
    username: '王五',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '7',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '8',
    username: '李四',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '9',
    username: '王五',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  },
  {
    id: '10',
    username: '张三',
    mobile: '1323xxxxx23',
    mail: '782099197@qq.com',
    gender: '男',
    createtime: '2025-09-01 12:12:12'
  }

]

// 表格 - headerRowClassName
const headerRowClassName = ({ row, rowIndex }) => {
  if (rowIndex === 0) {
    return 'first-header-row';
  }
  return '';
}
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  .table-container {
    height: calc(100% - 90px);
    border-radius: 8px;
    background: #fff;
    padding: 10px;
    margin-top: 20px;
    .table {
      margin-top: 10px;
      height: calc(100% - 100px);
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
</style>