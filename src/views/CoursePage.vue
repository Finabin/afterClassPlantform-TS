<template>
  <el-main class="coursepage-view">
    <div class="coursepage-header">
      课程管理
    </div>
    <div class="coursepage-main">
      <div class="coursepage-search">
        <el-input type="text" v-model="search_name" placeholder="姓名"
          style="width: 150px; height: 40px; margin-right: 20px" />
        <el-input type="text" v-model="search_course" placeholder="课程名"
          style="width: 150px; height: 40px; margin-right: 20px" />
        <el-select v-model="search_status" placeholder="课程状态" size="large" style="width: 180px; margin-right: 20px">
          <el-option v-for="item in courseStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="search_classification" placeholder="课程分类" size="large"
          style="width: 180px; margin-right: 20px">
          <el-option v-for="item in courseClassificationOptions" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
        <el-button @click="addCourse" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Plus />
          </el-icon>
          增加
        </el-button>
      </div>
      <div class="coursepage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="课程编号" width="150" v-if="false" />
          <el-table-column prop="courseName" label="课程名称" width="150" />
          <el-table-column prop="displayStatus" label="展示状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.displayStatus == '已上架'" style="color: #1890ff;">已上架</span>
              <span v-else style="color: red;">已下架</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="课程状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == '开课中'" style="color: #1890ff;">开课中</span>
              <span v-else-if="scope.row.status == '已结课'" style="color: red;">已结课</span>
              <span v-else style="color: gray;">未开课</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseClassification" label="分类" width="100" />
          <el-table-column prop="courseCover" label="封面" width="150">
            <template #default="scope">
              <img :src="scope.row.courseCover" alt="课程封面" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
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
      <div class="coursepage-pagination">
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handlePageChange"
          @prev-click="handlePageChange" @next-click="handlePageChange" size="default" :default-page-size="15" />
      </div>
    </div>
  </el-main>

  <el-dialog v-model="courseInfoDialogVisible" title="修改" width="500" align-center>
    <div class="coursepage-dialog-row">
      <span class="coursepage-dialog-span-require">*</span>
      <span class="coursepage-dialog-span-text">展示状态：</span>
      <el-radio-group v-model="courseInfo.displayStatus">
        <el-radio value="已上架">已上架</el-radio>
        <el-radio value="未上架">已下架</el-radio>
      </el-radio-group>
    </div>
    <div class="coursepage-dialog-row">
      <span class="coursepage-dialog-span-require">*</span>
      <span class="coursepage-dialog-span-text">课程状态：</span>
      <el-radio-group v-model="courseInfo.status">
        <el-radio value="未开课">未开课</el-radio>
        <el-radio value="开课中">开课中</el-radio>
        <el-radio value="已结课">已结课</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <div class="coursepage-dialog-footer">
        <el-button @click="courseInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { courseStatusOptions, courseClassificationOptions } from '../static/coursePageData'
import { getAllCourseAPI, getTeacherCourseAPI, searchAllCourseAPI, searchTeacherCourseAPI, updateCourseInfoAPI } from '../apis/course'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";


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

const router = useRouter()
const userInfoStore = useUserInfoStore();
const { role, id } = storeToRefs(userInfoStore);
const search_date = ref('')
const search_status = ref('')
const search_name = ref('')
const search_course = ref('')
const search_classification = ref('')
const tableData = ref<Array<CoursePageData>>([])
const curPageData = ref<Array<CoursePageData>>([])
const pageSize = ref(15)
const curPage = ref(1)
const courseInfo = ref({
  courseId: 0,
  displayStatus: "",
  status: ""
})
const courseInfoDialogVisible = ref(false)

const getCoursePageData = async () => {
  let coursePageData
  if (role.value == "2") {
    const data = {
      id: Number(id.value),
    }
    coursePageData = await getTeacherCourseAPI(data)
  } else {
    coursePageData = await getAllCourseAPI()
  }
  return coursePageData
}

onMounted(async () => {
  const coursePageData = await getCoursePageData()
  tableData.value = coursePageData.data || []
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_name, search_course, search_status, search_classification], async ([newValOne, newValTwo, newValThree, newValFour, newValFive]) => {
  // 检查两个输入框是否同时为空
  if (newValOne === '' && newValTwo === '' && newValThree === '' && newValFour === '' && newValFive === '') {
    const coursePageData = await getCoursePageData()
    tableData.value = coursePageData.data || []
    curPageData.value = tableData.value.slice(0, pageSize.value)
    curPage.value = 1
  }
});

const handleEdit = (row: CoursePageData) => {
  courseInfoDialogVisible.value = true
  courseInfo.value.displayStatus = String(row.displayStatus)
  courseInfo.value.status = String(row.status)
  courseInfo.value.courseId = row.id
}

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
  let res
  if (search_date.value === "" && search_name.value === "" && search_course.value === "" && search_status.value === "" && search_classification.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    username: search_name.value,
    course_name: search_course.value,
    status: search_status.value,
    beginTime: search_date.value,
    classification: search_classification.value
  }
  if (role.value == "2") {
    data["id"] = Number(id.value)
    res = await searchTeacherCourseAPI(data)
  } else {
    res = await searchAllCourseAPI(data)
  }
  tableData.value = res.data || []
  curPageData.value = tableData.value.slice(0, pageSize.value)
  curPage.value = 1
}

const addCourse = function () {
  router.push('/course/add')
}

const handleConfirm = async () => {
  courseInfoDialogVisible.value = false
  const data = {
    courseId: courseInfo.value.courseId,
    status: courseInfo.value.status,
    displayStatus: courseInfo.value.displayStatus
  }
  const res = await updateCourseInfoAPI(data)
  if (res.code === 1) {
    ElMessage.success('修改成功')
    const coursePageData = await getCoursePageData()
    tableData.value = coursePageData.data
    curPageData.value = tableData.value.slice(curPage.value - 1 * pageSize.value, curPage.value * pageSize.value)
    courseInfoDialogVisible.value = false
  } else {
    ElMessage.error('修改失败')
  }
}

const handleCheck = (row: CoursePageData) => {
  router.push(`/course/edit/${row.id}`)
}

</script>

<style>
@import url('../assets/css/views/coursePage.css');
</style>