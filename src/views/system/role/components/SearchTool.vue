<template>
  <div class="search-tool">
    <el-form
        ref="formRef"
        :model="form"
        label-width="auto"
        :inline="true"
        style=" width: 100%;"
    >
      <el-row :gutter="24" >
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="6" :lg="6" :xl="6" >
          <el-form-item label="角色名称" prop="name" style="width: 100%;">
            <el-input v-model="form.name" placeholder="角色名称" clearable/>
          </el-form-item>
        </el-col>
        <el-col style="padding: 10px" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="角色描述" prop="description" style="width: 100%" >
            <el-input v-model="form.description" placeholder="角色描述" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="display: flex;justify-content: end; padding: 10px">
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
import type {Role} from "@/types/role.ts";
const $emit = defineEmits(['search'])
const formRef = ref<FormInstance>()

const form = reactive<Role>({})


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
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
}

.el-form-item {
  margin-bottom: 0px; /* 设置自定义间距 */
}
</style>