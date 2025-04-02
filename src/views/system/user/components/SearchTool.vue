<template>
  <div class="search-tool">
    <el-form
        ref="formRef"
        :model="form"
        label-width="auto"
        :inline="true"
        style=" width: 100%;"
    >
      <el-row :gutter="20"  >
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="8" :lg="6" :xl="5" >
          <el-form-item label="用户名" prop="username" style="width: 100%;">
            <el-input v-model="form.username" clearable placeholder="用户名"/>
          </el-form-item>
        </el-col>
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
          <el-form-item label="性别" prop="gender" style="width: 100%" >
            <el-select
                v-model="form.gender"
                placeholder="性别"
                clearable
            >
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
          <el-form-item label="邮箱" prop="mail" style="width: 100%" >
            <el-input v-model="form.mail" placeholder="邮箱" clearable />
          </el-form-item>
        </el-col>
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
          <el-form-item label="手机号" prop="mobile" style="width: 100%" >
            <el-input v-model="form.mobile" placeholder="手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="12" :md="8" :lg="6" :xl="4" style="display: flex;justify-content: end; padding: 10px">
          <el-button :icon="RefreshRight" @click="resetForm(formRef)">重置</el-button>
          <el-button color="#626aef" :dark="false" plain :icon="Search" @click="searchHandle(formRef)">查询</el-button>
        </el-col>
      </el-row>



    </el-form>
  </div>

</template>

<script setup lang="ts" name="UserSearchTool">
import {reactive, ref} from 'vue'
import {RefreshRight, Search} from "@element-plus/icons-vue";
import type {FormInstance} from "element-plus";
const $emit = defineEmits(['search'])
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  mobile: '',
  mail: '',
  gender: '',
})

const genders = reactive([
  {
    value: 1,
    label: '男',
  },
  {
    value: 0,
    label: '女',
  }
])

/**
 * 搜索
 */
const searchHandle = () => {
  $emit('search', form)
}

/**
 * 重置
 * @param formEl
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang="scss">
.search-tool {
  padding: 10px;
  display: flex;
  align-items: center;

  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
}

.el-form-item {
  margin-bottom: 0px; /* 设置自定义间距 */
}
</style>