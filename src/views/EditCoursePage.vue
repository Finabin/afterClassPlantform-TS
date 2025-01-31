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
              <el-select v-model="courseInfo.grade" placeholder="请选择" size="large"
                style="width: 240px; margin-right: 20px">
                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程分类：</div>
            <div>
              <el-select v-model="courseInfo.courseClassification" placeholder="请选择" size="large"
                style="width: 240px; margin-right: 20px">
                <el-option v-for="item in courseClassificationOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程价格：</div>
            <div class="addcoursepage-main-content-form-single-input">
              <el-input placeholder="请输入" v-model.number="courseInfo.price" style="width: 240px; height: 38px;" />
              <span>元</span>
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课时：</div>
            <div>
              <el-input placeholder="请输入" v-model.number="courseInfo.courseTime" style="width: 240px; height: 38px;" />
            </div>
          </div>
          <div class="addcoursepage-main-content-form-single">
            <div class="addcoursepage-main-content-form-single-title"><span>*</span>课程封面：</div>
            <div>
              <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadCover" :limit="1">
                <img v-if="courseInfo.courseCover != ''" :src="courseInfo.courseCover"
                  style="width: 250px; height: auto;" />
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
          <el-table :data="courseInfo.catalog" :row-style="rowStyle" :cell-style="cellStyle"
            :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle" border>
            <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
            <el-table-column prop="id" v-if="false" />
            <el-table-column prop="catalogName" label="目录名称" width="180" />
            <el-table-column prop="catalogStatus" label="课程状态" width="180">
              <template #default="scope">
                <span v-if="scope.row.catalogStatus == '开课中'" style="color: #1890ff;">开课中</span>
                <span v-else-if="scope.row.catalogStatus == '已结课'" style="color: red;">已结课</span>
                <span v-else style="color: gray;">未开课</span>
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" label="开课时间" width="180" />
            <el-table-column prop="file" label="课程文件" width="180">
              <template #default="scope">
                <el-upload :show-file-list="false" :http-request="handleUpload(scope.row)">
                  <div class="personinfo-upload-btn">点我上传</div>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <span @click="handleEdit(scope.row)" style="color: #1890ff; cursor: pointer">修改</span>
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
          <el-input v-model="courseInfo.courseIntro" style="width: 800px" :rows="5" type="textarea"
            placeholder="最多150字" />
        </div>
      </div>
      <div class="addcoursepage-footer">
        <div class="addcoursepage-footer-btn">
          <el-button @click="cancelAddCourse" style="width: 150px; height: 38px;">取消</el-button>
        </div>
        <div class="addcoursepage-footer-btn">
          <el-button type="primary" @click="handleEditCourse" style="width: 150px; height: 38px;">确定</el-button>
        </div>
      </div>
    </div>
  </el-main>

  <el-dialog v-model="courseStatusDialogVisible" title="修改" width="500" align-center>
    <div class="addcoursepage-dialog-row">
      <span class="addcoursepage-dialog-span-require">*</span>
      <span class="addcoursepage-dialog-span-text">课程状态：</span>
      <el-radio-group v-model="courseEditInfo.status">
        <el-radio value="未开课">未开课</el-radio>
        <el-radio value="开课中">开课中</el-radio>
        <el-radio value="已结课">已结课</el-radio>
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
      <el-input v-model="courseAddInfo.catalogName" placeholder="请输入" style="width: 240px; height: 38px;" />
    </div>
    <div class="addcoursepage-dialog-row">
      <span class="addcoursepage-dialog-span-require">*</span>
      <span class="addcoursepage-dialog-span-text">开课时间：</span>
      <el-date-picker v-model="courseAddInfo.beginTime" type="datetime" placeholder="选择一个日期" size="large"
        value-format="YYYY-MM-DD HH:mm:ss" />
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
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCourseDetailAPI, updateCatalogStatusAPI, updateCourseAPI, addCatalogAPI } from '../apis/course'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { courseClassificationOptions } from '../static/coursePageData'
import { gradeOptions } from '@/static/mainPageData'
import { uploadFileAPI } from '../apis/system'

interface CourseCatalogInfo {
  catalogName: string,
  file?: string,
  id?: number,
  beginTime: string,
  catalogStatus?: string
}
interface CourseInfoData {
  catalog: Array<CourseCatalogInfo>,
  id: number,
  courseName: string,
  grade: string,
  courseClassification: string,
  price: number,
  courseTime: number,
  courseCover: string,
  courseIntro: string
}

const router = useRouter()
const route = useRoute()
const courseStatusDialogVisible = ref(false)
const addCatalogDialogVisible = ref(false)
const courseInfo = ref<CourseInfoData>({
  catalog: [],
  id: 0,
  courseName: "",
  grade: "",
  courseClassification: "",
  price: 0,
  courseTime: 0,
  courseCover: "",
  courseIntro: ""
})
const courseEditInfo = ref({
  id: 0,
  status: "",
  catalogIndex: -1
})
const courseAddInfo = ref({
  catalogName: "",
  beginTime: ""
})

onMounted(async () => {
  const data = {
    id: Number(route.params.id)
  }
  const coursePageData = await getCourseDetailAPI(data)
  courseInfo.value = coursePageData.data
})

const uploadCover = async ({ file }: { file: File; }) => {
  try {
    const formData = new FormData()
    formData.append('image', file)
    const response = await uploadFileAPI(formData)
    console.log('🚀 ~ handleUpload ~ response:', response)
    if (response.code === 1) {
      ElMessage.success({
        message: '上传成功',
        type: 'success',
      })
      courseInfo.value.courseCover = response.data
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    ElMessage.error('上传失败')
  }
}

const handleEdit = (row: CourseCatalogInfo) => {
  if (!row.file || row.file === '') {
    ElMessage({
      message: '请先上传课件，上传课件后才能修改课程状态！',
      type: 'error',
    })
    return
  }
  courseEditInfo.value.id = row.id
  courseEditInfo.value.status = row.catalogStatus
  courseEditInfo.value.catalogIndex = courseInfo.value.catalog.indexOf(row)
  courseStatusDialogVisible.value = true
}

const changeStatusConfirm = async () => {
  const data = {
    id: courseEditInfo.value.id,
    status: courseEditInfo.value.status
  }
  const res = await updateCatalogStatusAPI(data)
  if (res.code === 1) {
    courseInfo.value.catalog[courseEditInfo.value.catalogIndex].catalogStatus = courseEditInfo.value.status
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

const handleUpload = (row: CourseCatalogInfo) => {

}

const handleAddCatalogConfirm = async () => {
  if (!courseAddInfo.value.catalogName || !courseAddInfo.value.beginTime) {
    ElMessage({
      message: '请填写完整信息',
      type: 'error',
    })
    return
  }
  const data = {
    id: courseInfo.value.id,
    catalogName: courseAddInfo.value.catalogName,
    beginTime: courseAddInfo.value.beginTime
  }
  const res = await addCatalogAPI(data)
  if (res.code === 1) {
    courseInfo.value!.catalog.push({
      id: res.data.id,
      catalogStatus: '未开课',
      catalogName: courseAddInfo.value.catalogName,
      beginTime: courseAddInfo.value.beginTime
    })
    addCatalogDialogVisible.value = false
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error',
    })
  }
}

const indexMethod = (index: number) => {
  return index + 1
}

const cancelAddCourse = () => {
  courseInfo.value = {}
  router.push('/course')
}

const handleEditCourse = async () => {
  const data = {
    id: courseInfo.value.id,
    courseName: courseInfo.value.courseName,
    grade: courseInfo.value.grade,
    courseClassification: courseInfo.value.courseClassification,
    price: courseInfo.value.price,
    courseTime: courseInfo.value.courseTime,
    courseCover: courseInfo.value.courseCover,
    courseIntro: courseInfo.value.courseIntro,
    catalog: courseInfo.value.catalog
  }
  const res = await updateCourseAPI(data)
  if (res.code === 1) {
    ElMessage({
      message: '更新成功',
      type: 'success',
    })
    router.push('/coursePage')
  } else {
    ElMessage({
      message: '更新失败',
      type: 'error',
    })
  }
}

const toCoursePage = () => {
  router.push('/course')
}

</script>

<style>
@import url('../assets/css/views/addCoursePage.css');
</style>