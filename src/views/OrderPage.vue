<template>
  <el-main>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/order' }">订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>
        <input type="text" v-model="search_course_name" placeholder="课程名称" />
        <input type="text" v-model="search_order_number" placeholder="订单号" />
        <input type="text" v-model="search_user_name" placeholder="买家用户名" />
        <el-select v-model="search_order_state" placeholder="选择订单状态" size="large" style="width: 240px">
          <el-option v-for="item in orderState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" :size="size" />
        <button>搜索</button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column label="序号" type="index" :index="indexMethod" />
        <el-table-column prop="id" label="订单编号" width="150" />
        <el-table-column prop="date" label="订单状态" width="150" />
        <el-table-column prop="name" label="课程名称" width="120" />
        <el-table-column prop="state" label="老师" width="120" />
        <el-table-column prop="city" label="买家用户名" width="120" />
        <el-table-column prop="address" label="课时" width="200" />
        <el-table-column prop="zip" label="价格" width="120" />
        <el-table-column prop="zip" label="创建时间" width="120" />
        <el-table-column prop="zip" label="支付时间" width="120" />
      </el-table>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { orderState } from '@/static/orderData'

const now = new Date()
const search_date = ref(dayjs(now).format('YYYY-MM-DD'))
const search_course_name = ref('')
const search_order_number = ref('')
const search_user_name = ref('')
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

</script>