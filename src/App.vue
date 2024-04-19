<template>
  <el-config-provider :locale="locale">
  <RouterView/>
</el-config-provider>
</template>

<script setup lang="ts">
 import zhCn from 'element-plus/es/locale/lang/zh-cn'
 zhCn.el.pagination = {
    pagesize: '/page',
    total: '总 {total} 条',
    goto: '跳转至',
    pageClassifier: ''
  } as any
const locale = zhCn
</script>


<style scoped>

</style>
