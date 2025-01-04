<template>
  <el-main>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>
        <input type="text" v-model="search_course_name" placeholder="课程名称" />
        <input type="text" v-model="search_order_number" placeholder="课程小节" />
        <el-select v-model="search_order_state" placeholder="选择订单状态" size="large" style="width: 240px">
          <el-option v-for="item in orderState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" />
        <button>搜索</button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column label="序号" type="index" :index="indexMethod" />
        <el-table-column prop="id" label="课程编号" width="150" />
        <el-table-column prop="name" label="课程名称" width="120" />
        <el-table-column prop="state" label="课程小节" width="120" />
        <el-table-column prop="city" label="老师" width="120" />
        <el-table-column prop="address" label="课程文件" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="downloadFile(scope.row.id)">
              点我下载
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="文件大小" width="120" />
        <el-table-column prop="zip" label="开课时间" width="120" />
      </el-table>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { orderState } from '@/mocks/orderData'

const now = new Date()
const search_date = ref(dayjs(now).format('YYYY-MM-DD'))
const search_course_name = ref('')
const search_order_number = ref('')
const search_order_state = ref('')

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const indexMethod = (index: number) => {
  return index++
}

const downloadFile = (id: number) => {
  console.log(id)
}

</script>