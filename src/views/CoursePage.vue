<template>
  <el-main class="coursepage-view">
    <div class="coursepage-header">
      课程管理
    </div>
    <div class="coursepage-main">
      <div class="coursepage-search">
        <el-input type="text" v-model="search_name_phone" placeholder="姓名或手机号"
          style="width: 240px; height: 40px; margin-right: 20px" />
        <el-select v-model="search_status" placeholder="课程状态" size="large" style="width: 240px; margin-right: 20px">
          <el-option v-for="item in courseStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="search_classification" placeholder="课程分类" size="large"
          style="width: 240px; margin-right: 20px">
          <el-option v-for="item in courseClassificationOptions" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <button @click="search">搜索</button>
        <button @click="addCourse">增加</button>
      </div>
      <div class="coursepage-result">
        <el-table :data="tableData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="课程编号" width="150" v-if="false" />
          <el-table-column prop="courseName" label="课程名称" width="150" />
          <el-table-column prop="displayStatus" label="展示状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.displayStatus == 1" style="color: aqua;">已上架</span>
              <span v-else style="color: red;">已下架</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="课程状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == 1" style="color: aqua;">开课中</span>
              <span v-else-if="scope.row.status == 2" style="color: red;">已结课</span>
              <span v-else style="color: gray;">未开课</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseClassification" label="分类" width="100" />
          <el-table-column prop="courseCover" label="封面" width="150" />
          <el-table-column prop="teacherName" label="老师" width="120" />
          <el-table-column prop="grade" label="年级" width="120" />
          <el-table-column prop="courseTime" label="课时" width="100" />
          <el-table-column prop="price" label="价格" width="100" />
          <el-table-column prop="beginTime" label="开课时间" width="200" />
          <el-table-column prop="createTime" label="创建时间" width="200" />
          <el-table-column fixed="right" label="操作" min-width="150">
            <template #default="scope">
              <span @click="handleEdit(scope.row)" style="color: #1890ff; margin: 0 10px; cursor: pointer;">修改</span>
              <span @click="handleCheck(scope.row)" style="color: #1890ff; margin: 0 10px; cursor: pointer;">查看课程</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          @prev-click="handlePrevClick" @next-click="handleNextClick" />
      </div>
    </div>
  </el-main>

  <el-dialog v-model="courseInfoDialogVisible" title="修改" width="500" align-center>
    <div class="coursepage-dialog-row">
      <span class="coursepage-dialog-span-require">*</span>
      <span class="coursepage-dialog-span-text">展示状态：</span>
      <el-radio-group v-model="teacherInfo.status">
        <el-radio value="1">已上架</el-radio>
        <el-radio value="0">已下架</el-radio>
      </el-radio-group>
    </div>
    <div class="coursepage-dialog-row">
      <span class="coursepage-dialog-span-require">*</span>
      <span class="coursepage-dialog-span-text">课程状态：</span>
      <el-radio-group v-model="teacherInfo.status">
        <el-radio value="0">未开课</el-radio>
        <el-radio value="1">开课中</el-radio>
        <el-radio value="2">已结课</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <div class="coursepage-dialog-footer">
        <el-button @click="teacherInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="teacherInfoDialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { courseStatusOptions, courseClassificationOptions } from '../static/coursePageData'
// import { coursePageData } from '../mocks/coursePage'
import { getAllCourseAPI } from '../apis/course'

interface CoursePageData {
  id: number
  courseName: string
  displayStatus: number
  grade: string
  price: string
  status: number
  courseClassification: string
  courseCover: string
  courseTime: number
  teacherName: string
  beginTime: string
  createTime: string
}

const router = new useRouter()

const search_date = ref('')
const search_status = ref('')
const search_name_phone = ref('')
const search_classification = ref('')
const tableData = ref<Array<CoursePageData>>([])
const pageSize = ref(5)
const courseInfo = ref({
  displayStatus: "",
  status: ""
})
const courseInfoDialogVisible = ref(false)

onMounted(async () => {
  const coursePageData = await getAllCourseAPI()
  tableData.value = coursePageData.data
})

const handleEdit = (row: TeacherPageData) => {
  row.status = row.status.toString()
  courseInfoDialogVisible.value = true
  courseInfo.value = row
}

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
  if (search_date.value === "" && search_name_phone.value === "" && search_status.value === "" && search_classification.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    nickName: "",
    phone: "",
    status: search_status.value,
    createTime: search_date.value,
    classification: search_classification.value
  }
  console.log(data);
}

const addCourse = function () {
  router.push('/course/add')
}

</script>

<style>
@import url('../assets/css/views/coursePage.css');
</style>