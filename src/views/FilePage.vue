<template>
  <el-main class="filepage-view">
    <div class="filepage-header">
      文件管理
    </div>
    <div class="filepage-main">
      <div class="filepage-search">
        <el-input type="text" v-model="search_course" placeholder="课程名称"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-input type="text" v-model="search_courseSection" placeholder="课程小节"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div class="filepage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="150" />
          <el-table-column prop="id" label="编号" width="150" v-if="false" />
          <el-table-column prop="courseName" label="课程名称" width="250" />
          <el-table-column prop="courseSection" label="课程小节" width="250" />
          <el-table-column prop="teacherName" label="老师" width="150" />
          <el-table-column prop="courseFile" label="课程文件" width="150">
            <template #default="scope">
              <a :href="scope.row.courseFile" target="_blank" class="filepage-a">点我下载</a>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="文件大小" width="150">
            <template #default="scope">
              <span>{{ scope.row.fileSize }}MB</span>
            </template>
          </el-table-column>
          <el-table-column prop="beginTime" label="开课时间" width="265" />
        </el-table>
      </div>
      <div class="filepage-pagination">
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
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { getAllFileAPI, getTeacherFileAPI, getStudentFileAPI, searchAllFileAPI, searchTeacherFileAPI, searchStudentFileAPI } from '../apis/file'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

interface FilePageData {
  id: number
  status: number
  courseName: string
  teacherName: number
  courseSection: string,
  courseFile: string,
  beginTime: string,
  fileSize: number,
}

const userInfoStore = useUserInfoStore();
const { role, id } = storeToRefs(userInfoStore);
const search_date = ref('')
const search_courseSection = ref('')
const search_course = ref('')
const tableData = ref<Array<FilePageData>>([])
const curPageData = ref<Array<FilePageData>>([])
const pageSize = ref(15)
const curPage = ref(1)

const getFilePageData = async () => {
  let filePageData
  if (role.value === "0") {
    filePageData = await getAllFileAPI()
  } else if (role.value === "1") {
    const data = {
      teacherId: id.value
    }
    filePageData = await getTeacherFileAPI(data)
  } else if (role.value === "2") {
    const data = {
      studentId: id.value
    }
    filePageData = await getStudentFileAPI(data)
  }
  return filePageData
}

onMounted(async () => {
  const filePageData = await getFilePageData()
  tableData.value = filePageData.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_courseSection, search_course], async ([newValOne, newValTwo, newValThree]) => {
  if (newValOne === '' && newValTwo === '' && newValThree === '') {
    const filePageData = await getFilePageData()
    tableData.value = filePageData.data
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
  if (search_date.value === "" && search_courseSection.value === "" && search_course.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let res
  let data = {
    courseSection: search_courseSection.value,
    courseName: search_course.value,
    beginTime: search_date.value,
  }
  if (role.value !== '0') {
    data['userId'] = Number(id.value)
  }
  if (role.value === "0") {
    res = await searchAllFileAPI(data)
  } else if (role.value === "1") {
    res = await searchTeacherFileAPI(data)
  } else if (role.value === "2") {
    res = await searchStudentFileAPI(data)
  }
  tableData.value = res.data || []
  curPageData.value = tableData.value.slice(0, pageSize.value)
  curPage.value = 1
}

</script>

<style>
@import url('../assets/css/views/filePage.css');
</style>