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
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div class="orderpage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="编号" width="150" v-if="false" />
          <el-table-column prop="orderNo" label="订单编号" width="180" />
          <el-table-column prop="status" label="订单状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == '待支付'" style=" color: gray">待支付</span>
              <span v-else-if="scope.row.status == '已支付'" style="color: #1890ff;">已支付</span>
              <span v-else style="color: red;">关闭</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="课程名称" width="150" />
          <el-table-column prop="teacherName" label="老师" width="120" />
          <el-table-column prop="buyerName" label="买家用户名" width="150" />
          <el-table-column prop="courseTime" label="课时" width="100" />
          <el-table-column prop="price" label="价格" width="100">
            <template #default="scope">
              <span style=" color: orange">{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="201" />
          <el-table-column prop="payTime" label="支付时间" width="201" />
        </el-table>
      </div>
      <div class="orderpage-pagination">
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handlePageChange"
          @prev-click="handlePageChange" @next-click="handlePageChange" size="default" :default-page-size="15" />
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { orderState } from '../static/orderPageData'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { getAllOrderAPI, getTeacherOrderAPI, getStudentOrderAPI, searchAllOrderAPI, searchTeacherOrderAPI, searchStudentOrderAPI } from '../apis/order'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

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

const userInfoStore = useUserInfoStore();
const { role, id } = storeToRefs(userInfoStore);
const search_date = ref('')
const search_status = ref('')
const search_course = ref('')
const search_buyer = ref('')
const search_orderNo = ref('')
const tableData = ref<Array<OrderPageData>>([])
const curPageData = ref<Array<OrderPageData>>([])
const pageSize = ref(15)
const curPage = ref(1)

const getOrderPageData = async () => {
  let orderPageData
  if (role.value == '0') {
    orderPageData = await getAllOrderAPI()
  } else if (role.value == '1') {
    const data = {
      userId: Number(id.value)
    }
    orderPageData = await getTeacherOrderAPI(data)
  } else if (role.value == '2') {
    const data = {
      userId: Number(id.value)
    }
    orderPageData = await getStudentOrderAPI(data)
  }
  return orderPageData
}

onMounted(async () => {
  const orderPageData = await getOrderPageData()
  tableData.value = orderPageData.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_buyer, search_status, search_orderNo, search_course], async ([newValOne, newValTwo, newValThree, newValFour, newValFive]) => {
  if (newValOne === '' && newValTwo === '' && newValThree === '' && newValFour === '' && newValFive === '') {
    const orderPageData = await getOrderPageData()
    tableData.value = orderPageData.data
    curPageData.value = tableData.value.slice(0, pageSize.value)
    curPage.value = 1
  }
});

const handleSizeChange = (val: number) => {
  pageSize.value = val
  curPageData.value = tableData.value.slice(pageSize.value * (curPage.value - 1), pageSize.value * curPage.value)
}

const handlePageChange = (val: number) => {
  curPage.value = val
  curPageData.value = tableData.value.slice(pageSize.value * (curPage.value - 1), pageSize.value * curPage.value)
}

const indexMethod = (index: number) => {
  return index + 1 + (curPage.value - 1) * pageSize.value
}

const search = async () => {
  if (search_date.value === "" && search_status.value === "" && search_course.value === "" && search_buyer.value === "" && search_orderNo.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    studentname: search_buyer.value,
    coursename: search_course.value,
    status: search_status.value,
    payTime: search_date.value,
    orderno: search_orderNo.value
  }
  let res
  if (role.value == '0') {
    res = await searchAllOrderAPI(data)
  } else if (role.value == '1') {
    data["id"] = Number(id.value)
    res = await searchTeacherOrderAPI(data)
  } else if (role.value == '2') {
    data["id"] = Number(id.value)
    res = await searchStudentOrderAPI(data)
  }
  tableData.value = res.data || []
  curPageData.value = tableData.value.slice(0, pageSize.value)
  curPage.value = 1
}

</script>

<style>
@import url('../assets/css/views/orderPage.css');
</style>