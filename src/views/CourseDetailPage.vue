<template>
  <el-main class="coursedetailpage-view">
    <div class="coursedetailpage-header">
      <span class="coursedetailpage-header-title" @click="goBack">首页</span>
      <span>&nbsp;/&nbsp;课程详情</span>
    </div>
    <div class="coursedetailpage-main">
      <div class="coursedetailpage-basicinfo">
        <div class="coursedetailpage-basicinfo-title">
          基础信息
        </div>
        <div class="coursedetailpage-basicinfo-content">
          <div class="coursedetailpage-basicinfo-content-row">
            <div class="coursedetailpage-basicinfo-content-img">
              <img :src="pageData!.courseCover" alt="课程封面" style="width: 250px; height: auto;" />
            </div>
            <div class="coursedetailpage-basicinfo-content-info">
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程名称:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  {{ pageData!.courseName }}
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程年级:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  {{ pageData!.grade }}
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程分类:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  {{ pageData!.courseClassification }}
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课时:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  {{ pageData!.courseTime }}
                </div>
              </div>
            </div>
          </div>
          <div class="coursedetailpage-basicinfo-content-row">
            <div class="coursedetailpage-basicinfo-content-info-intro">
              <div class="coursedetailpage-basicinfo-content-info-intro-require">*</div>
              <div class="coursedetailpage-basicinfo-content-info-intro-label">课程详情:</div>
              <div class="coursedetailpage-basicinfo-content-info-intro-data">
                {{ pageData!.courseIntro }}
              </div>
            </div>
            <div class="coursedetailpage-basicinfo-content-mybalance">
              <div class="coursedetailpage-basicinfo-content-display">
                <div class="coursedetailpage-basicinfo-content-title">课程价格</div>
                <div class="coursedetailpage-basicinfo-content-money">￥{{ pageData!.price }}</div>
              </div>
              <div class="coursedetailpage-basicinfo-content-symbol">
                <span>￥</span>
              </div>
              <div class="coursedetailpage-basicinfo-content-button">
                <el-button type="primary" @click="buyDialogVisible = true"
                  style="width: 120px; height: 75px; background: #FF9900; color: #fff; border-radius: 10px; font-size: 18px;">去购买</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="coursedetailpage-catalog">
        <div class="coursedetailpage-catalog-title">
          基础信息
        </div>
        <div class="coursedetailpage-catalog-table">
          <el-table :data="pageData!.catalog" :row-style="rowStyle" :cell-style="cellStyle"
            :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle" border>
            <el-table-column label=" 序号" type="index" :index="indexMethod" width="150" />
            <el-table-column prop="id" label="编号" width="150" v-if="false" />
            <el-table-column prop="catalogName" label="章节名称" width="250" />
            <el-table-column prop="catalogStatus" label="章节状态" width="150" />
            <el-table-column prop="beginTime" label="开课时间" width="200" />
            <el-table-column prop="file" label="课程文件" width="160">
              <template #default="scope">
                <a v-if="scope.$index === 0" class="file-a" :href="scope.row.file">点我试看</a>
                <span v-else>购买后可下载</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog v-model="buyDialogVisible" title="修改" width="500" align-center>
      <div class="teacherpage-dialog-row">
        你确定要购买<span>高考数学冲刺训练班</span>课程吗？
      </div>
      <template #footer>
        <div class="teacherpage-dialog-footer">
          <el-button @click="buyDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { buyCourseAPI, payCourseAPI } from '../apis/main'
import { getCourseDetailAPI } from '../apis/course'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

interface CourseCatalogInfo {
  catalogName: string,
  file: string,
  id: number,
  beginTime: string,
  catalogStatus: string
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
const userInfoStore = useUserInfoStore();
const { id } = storeToRefs(userInfoStore);
const buyDialogVisible = ref(false)
const pageData = ref<CourseInfoData>({
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
const courseID = route.params.id

onMounted(async () => {
  const data = {
    id: Number(courseID)
  }
  const res = await getCourseDetailAPI(data)
  if (res.code === 1) {
    pageData.value = res.data
  } else {
    ElMessage.error("获取课程详情失败！")
  }
})

const indexMethod = (index: number) => {
  return index + 1
}

const goBack = () => {
  router.go(-1)
}

const handleConfirm = async () => {
  const data = {
    id: Number(id.value),
    courseId: Number(router.currentRoute.value.params.id)
  }
  const res = await buyCourseAPI(data)
  if (res.code === 1) {
    const res2 = await payCourseAPI(data)
    if (res2.code === 1) {
      ElMessage.success('购买成功！')
      buyDialogVisible.value = false
    }
    else {
      ElMessage.error('购买失败！')
    }
  } else {
    ElMessage.error('购买失败！')
  }
}

</script>

<style>
@import url('../assets/css/views/courseDetailPage.css');
</style>