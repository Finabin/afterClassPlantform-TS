<template>
  <el-main class="orderpage-view">
    <div class="orderpage-header">
      订单管理
    </div>
    <div class="orderpage-main">
      <div class="orderpage-search">
        <el-input type="text" v-model="search_course" placeholder="课程名称"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-input type="text" v-model="search_orderNo" placeholder="订单号"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-input type="text" v-model="search_buyer" placeholder="买家用户名"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-select v-model="search_status" placeholder="订单状态" size="large" style="width: 240px; margin-right: 20px">
          <el-option v-for="item in orderState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <button @click="search">搜索</button>
      </div>
      <div class="orderpage-result">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="编号" width="150" v-if="false" />
          <el-table-column prop="orderNo" label="订单编号" width="180" />
          <el-table-column prop="status" label="订单状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == 1" style="color: gray">待支付</span>
              <span v-else-if="scope.row.status == 2" style="color: red;">已支付</span>
              <span v-else style="color: aqua;">关闭</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="课程名称" width="150" />
          <el-table-column prop="teacherName" label="老师" width="120" />
          <el-table-column prop="buyerName" label="买家用户名" width="150" />
          <el-table-column prop="courseTime" label="课时" width="100" />
          <el-table-column prop="price" label="价格" width="100" />
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column prop="payTime" label="支付时间" width="180" />
        </el-table>
      </div>
      <div>
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          @prev-click="handlePrevClick" @next-click="handleNextClick" />
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { orderState } from '../static/orderPageData'
import { orderPageData } from '../mocks/orderPage'

interface OrderPageData {
  id: number
  orderNo: string
  status: number
  courseName: string
  teacherName: number
  courseTime: string
  price: number
  createTime: string
  payTime: string
  buyerName: string
}

const search_date = ref('')
const search_status = ref('')
const search_course = ref('')
const search_buyer = ref('')
const search_orderNo = ref('')
const tableData = ref<Array<OrderPageData>>([])
const pageSize = ref(5)

onMounted(() => {
  tableData.value = orderPageData
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`)
}

const handlePrevClick = (val: number) => {
  console.log(`上一页: ${val}`)
}

const handleNextClick = (val: number) => {
  console.log(`下一页: ${val}`)
}

const indexMethod = (index: number) => {
  return index++
}

const search = () => {
  if (search_date.value === "" && search_status.value === "" && search_course.value === "" && search_buyer.value === "" && search_ordernumber.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    buyerName: search_buyer.value,
    courseName: search_course.value,
    status: search_status.value,
    payTime: search_date.value,
    orderNo: search_orderNo.value
  }
  console.log(data);
}

</script>

<style>
@import url('../assets/css/views/orderPage.css');
</style>