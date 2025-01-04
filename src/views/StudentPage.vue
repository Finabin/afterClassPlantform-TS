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
        <button @click="search">搜索</button>
      </div>
      <div class="studentpage-result">
        <el-table :data="tableData" style="width: 100%; margin: 20px;" header-align="center">
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <!-- <el-table-column prop="id" label="课程编号" width="150" /> -->
          <el-table-column prop="userName" label="用户名" width="250" />
          <el-table-column prop="nickName" label="姓名" width="200" />
          <el-table-column prop="phone" label="手机号" width="250" />
          <el-table-column prop="buyCourseNum" label="已购课程数" width="150" />
          <el-table-column prop="registerTime" label="注册时间" width="200" />
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
import studentPageData from '../mocks/studentPage'

interface StudentPageData {
  id: number
  username: string
  nickname: string
  phone: string
  buyCourseNum: number
  registerTime: string
}

const search_date = ref('')
const search_name_phone = ref('')
const tableData = ref<Array<StudentPageData>>([])
const pageSize = ref(5)

onMounted(() => {
  tableData.value = studentPageData
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
  const regex = /^1[3-9]\d{9}$/
  if (search_date.value === "" && search_name_phone.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    nickName: "",
    phone: "",
    registerTime: ""
  }
  if (search_date.value !== "") {
    data.registerTime = search_date.value
  }
  if (search_name_phone.value !== "" && regex.test(search_name_phone.value)) {
    data.registerTime = search_date.value
    data.phone = search_name_phone.value
  } else {
    data.registerTime = search_date.value
    data.nickName = search_name_phone.value
  }
  console.log(data);
}

</script>

<style>
@import url('../assets/css/views/studentPage.css');
</style>