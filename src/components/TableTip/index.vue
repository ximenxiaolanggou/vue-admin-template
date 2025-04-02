<template>
  <div class="table-tip" :style="{backgroundColor: metaData.bgcolor}">
    <div class="tip">{{metaData.tip}}</div>
    <div class="operation">
      <el-button :icon="Plus" @click="handleAdd" color="#626aef" :dark="false" plain>新增</el-button>
      <el-button :icon="Delete" @click="$emit('batchDelete')">批量删除</el-button>
      <el-button :icon="RefreshRight" @click="$emit('refresh')">刷新</el-button>
<!--      <el-button :icon="Setting" @click="">设置列表</el-button>-->
    </div>
  </div>
</template>

<script setup lang="ts" name="TableTip">
import type {TableTipProps} from "@/types/TableTip.ts";
import {Delete, Plus, RefreshRight, Setting} from "@element-plus/icons-vue";
const props = withDefaults(defineProps<{metaData: TableTipProps}>(), {
  metaData: () => {
    return {
      tip: '列表',
      bgcolor: '#fff'
    }
  }
})
const $emits = defineEmits(['add', 'batchDelete', 'refresh'])

/**
 * 添加按钮事件
 */
const handleAdd = () => {
  $emits('add')
}

</script>

<style scoped lang="scss">
.table-tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button {
  cursor: pointer;
}
</style>