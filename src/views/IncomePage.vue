<template>
  <el-main>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>
        <div>我的收入</div>
        <div><span>￥</span>1500</div>
      </div>
      <div>
        <div>
          <div>我的余额</div>
          <div><span>￥</span>1500</div>
        </div>
        <div>去提现</div>
      </div>
    </div>
    <div>
      <div>
        <input type="text" v-model="search_course_name" placeholder="用户名" />
        <input type="text" v-model="search_order_number" placeholder="老师" />
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
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="state" label="老师" width="120" />
        <el-table-column prop="city" label="处理类型" width="120" />
        <el-table-column prop="address" label="处理金额" width="200" />
        <el-table-column prop="address" label="处理前金额" width="200" />
        <el-table-column prop="address" label="处理后金额" width="200" />
        <el-table-column prop="zip" label="申请时间" width="120" />
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