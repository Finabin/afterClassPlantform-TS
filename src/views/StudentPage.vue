<template>
  <el-main class="studentpage-view">
    <div class="studentpage-header">
      学生管理
    </div>
    <div class="studentpage-main">
      <div class="studentpage-search">
        <el-input type="text" v-model="search_name_phone" placeholder="姓名或手机号"
          style="width: 240px; height: 40px; margin-right: 20px" />
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div class="studentpage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="150" />
          <el-table-column prop="nickName" label="用户名" width="250" />
          <el-table-column prop="userName" label="姓名" width="250" />
          <el-table-column prop="phone" label="手机号" width="250" />
          <el-table-column prop="buyCourseNum" label="已购课程数" width="212" />
          <el-table-column prop="createTime" label="注册时间" width="250" />
        </el-table>
      </div>
      <div class="studentpage-pagination">
        <el-pagination background layout="prev, pager, next, sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handlePageChange"
          @prev-click="handlePageChange" @next-click="handlePageChange" size="default" :default-page-size="15" />
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { getAllStudentInfoAPI, searchAllStudentInfoAPI, searchTStudentInfoAPI, getTStudentInfoAPI } from '../apis/user'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

interface StudentPageData {
  id: number
  username: string
  nickname: string
  phone: string
  buyCourseNum: number
  createTime: string
}

const userInfoStore = useUserInfoStore();
const { role, id } = storeToRefs(userInfoStore);
const search_date = ref('')
const search_name_phone = ref('')
const tableData = ref<Array<StudentPageData>>([])
const curPageData = ref<Array<StudentPageData>>([])
const pageSize = ref(15)
const curPage = ref(1)

const getStudentPageData = async () => {
  let studentPageData
  if (role.value === '0') {
    studentPageData = await getAllStudentInfoAPI()
  } else if (role.value === '1') {
    const data = {
      teacherId: Number(id.value)
    }
    studentPageData = await getTStudentInfoAPI(data)
  }
  return studentPageData
}

onMounted(async () => {
  const studentPageData = await getStudentPageData()
  tableData.value = studentPageData.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_name_phone], async ([newValOne, newValTwo]) => {
  // 检查两个输入框是否同时为空
  if (newValOne === '' && newValTwo === '') {
    const studentPageData = await getStudentPageData()
    tableData.value = studentPageData.data
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
  const regex = /^1[3-9]\d{9}$/
  if (search_date.value === "" && search_name_phone.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    username: "",
    phone: "",
    registerTime: ""
  }
  if (search_date.value !== "") {
    data.registerTime = search_date.value
  }
  if (search_name_phone.value !== "" && regex.test(search_name_phone.value)) {
    data.phone = search_name_phone.value
  } else {
    data.username = search_name_phone.value
  }
  let searchResult
  if (role.value === '0') {
    searchResult = await searchAllStudentInfoAPI(data)
  } else if (role.value === '1') {
    data['teacherId'] = Number(id.value)
    searchResult = await searchTStudentInfoAPI(data)
  }
  tableData.value = searchResult.data
  curPage.value = 1
  curPageData.value = tableData.value.slice(0, pageSize.value)
}

</script>

<style>
@import url('../assets/css/views/studentPage.css');
</style>