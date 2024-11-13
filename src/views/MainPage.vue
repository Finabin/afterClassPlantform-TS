<template>
  <el-main>
    <div>首页</div>
    <div>
      <el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div>
      <MainFilterListItem />
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainFilterListItem from '@/components/MainFilterListItem.vue'

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
]
</script>

<style scoped>

</style>