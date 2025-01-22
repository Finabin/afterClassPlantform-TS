<template>
  <el-main class="addcoursepage-view">
    <div class="addcoursepage-header">
      <span @click="toCoursePage" class="addcoursepage-header-span">课程管理</span>
      <span> / 查看课程</span>
    </div>
    <div class="addcoursepage-main">
      <div class="addcoursepage-main-content">
        <div class="addcoursepage-main-content-label">
          基础信息
        </div>
        <div class="addcoursepage-main-content-form">
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程名称：</div>
            <div class="addcoursepage-main-content-form-single-input">
              <el-input placeholder="请输入" v-model="courseInfo.courseName" style="width: 240px; height: 38px;" />
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程年级：</div>
            <div>
              <el-select v-model="c" placeholder="请选择" size="large" style="width: 240px; margin-right: 20px">
                <el-option v-for="item in courseStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程分类：</div>
            <div>
              <el-select v-model="courseInfo.courseClassification" placeholder="请选择" size="large"
                style="width: 240px; margin-right: 20px">
                <el-option v-for="item in courseStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程价格：</div>
            <div class="addcoursepage-main-content-form-single-input">
              <el-input placeholder="请输入" v-model="courseInfo.price" style="width: 240px; height: 38px;" />
              <span>元</span>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课时：</div>
            <div>
              <el-input placeholder="请输入" v-model="courseInfo.courseTime" style="width: 240px; height: 38px;" />
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程封面：</div>
            <div>
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="addcoursepage-main-content">
        <div class="addcoursepage-main-content-label">
          课程目录
        </div>
        <div>
          <el-table :data="tableData">
            <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
            <el-table-column prop="id" v-if="false" />
            <el-table-column prop="date" label="目录名称" width="180" />
            <el-table-column prop="name" label="课程状态" width="180">
              <template #default="scope">
                <span v-if="scope.row.status == 1" style="color: aqua;">开课中</span>
                <span v-else-if="scope.row.status == 2" style="color: red;">已结课</span>
                <span v-else style="color: gray;">未开课</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="开课时间" width="180" />
            <el-table-column prop="name" label="课程文件" width="180">
              <template #default="scope">
                <span @click="handleUpload(scope.row.id)">点我上传</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <span @click="handleEdit(scope.row)">修改</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button type="primary" @click="addCatalogDialogVisible = true"
            style="width: 150px; height: 38px;">增加目录</el-button>
        </div>
      </div>
      <div class="addcoursepage-main-content">
        <div class="addcoursepage-main-content-label">
          课程详情
        </div>
        <div class="addcoursepage-main-content-textarea">
          <el-input v-model="textarea" style="width: 800px" :rows="5" type="textarea" placeholder="最多150字" />
        </div>
      </div>
      <div class="addcoursepage-footer">
        <div class="addcoursepage-footer-btn">
          <el-button @click="cancelAddCourse" style="width: 150px; height: 38px;">取消</el-button>
        </div>
        <div class="addcoursepage-footer-btn">
          <el-button type="primary" @click="handleAddCourse" style="width: 150px; height: 38px;">确定</el-button>
        </div>
      </div>
    </div>
  </el-main>

  <el-dialog v-model="courseStatusDialogVisible" title="修改" width="500" align-center>
    <div class="addcoursepage-dialog-row">
      <span class="addcoursepage-dialog-span-require">*</span>
      <span class="addcoursepage-dialog-span-text">课程状态：</span>
      <el-radio-group v-model="courseEditInfo.status">
        <el-radio value="0">未开课</el-radio>
        <el-radio value="1">开课中</el-radio>
        <el-radio value="2">已结课</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <div class="addcoursepage-dialog-footer">
        <el-button @click="courseStatusDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeStatusConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="addCatalogDialogVisible" title="增加目录" width="500" align-center>
    <div class="addcoursepage-dialog-row">
      <span class="addcoursepage-dialog-span-require">*</span>
      <span class="addcoursepage-dialog-span-text">目录名称：</span>
      <el-input v-model="courseAddInfo.courseName" placeholder="请输入" style="width: 240px; height: 38px;" />
    </div>
    <div class="addcoursepage-dialog-row">
      <span class="addcoursepage-dialog-span-require">*</span>
      <span class="addcoursepage-dialog-span-text">开课时间：</span>
      <el-date-picker v-model="courseAddInfo.beginTime" type="date" placeholder="选择一个日期" size="large"
        value-format="YYYY-MM-DD" />
    </div>
    <template #footer>
      <div class="addcoursepage-dialog-footer">
        <el-button @click="addCatalogDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddCatalogConfirm">
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
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { courseStatusOptions, courseClassificationOptions } from '../static/coursePageData'
// import { coursePageData } from '../mocks/coursePage'
import { updateCatalogStatusAPI, addCatalogAPI } from '../apis/course'

interface CourseInfoData {
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

const tableData = ref<Array<CourseInfoData>>([])
const courseStatusDialogVisible = ref(false)
const addCatalogDialogVisible = ref(false)
const courseInfo = ref<CourseInfoData>()
const courseEditInfo = ref({
  status: -1
})
const courseAddInfo = ref({
  catalogName: "",
  beginTime: ""
})

onMounted(() => {
  tableData.value = coursePageData
})

const handleEdit = (row: CourseInfoData) => {
  row.status = row.status.toString()
  courseInfoDialogVisible.value = true
  courseEditInfo.value = row
}

const changeStatusConfirm = async () => {
  const data = {
    id: courseInfo.value!.id,
    status: String(courseEditInfo.value.status)
  }
  const res = await updateCatalogStatusAPI(data)
  if (res.code === 1) {
    courseStatusDialogVisible.value = false
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error',
    })
  }
}

const handleUpload = (id: number) => {

}

const handleAddCatalogConfirm = async () => {
  const data = {
    id: courseInfo.value!.id,
    catalogName: courseAddInfo.value.catalogName,
    beginTime: courseAddInfo.value.beginTime
  }
  const res = await addCatalogAPI(data)
  if (res.code === 1) {
    addCatalogDialogVisible.value = false
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error',
    })
  }
}

const indexMethod = (index: number) => {
  return index++
}

const cancelAddCourse = () => {
  courseInfo.value = {}
  router.push('/course')
}

const handleAddCourse = () => {
  ElMessage({
    message: '添加成功',
    type: 'success',
  })
  router.push('/coursePage')
}

const toCoursePage = () => {
  router.push('/course')
}

</script>

<style>
@import url('../assets/css/views/addCoursePage.css');
</style>