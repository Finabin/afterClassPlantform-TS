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
              <img src="" alt="">
            </div>
            <div class="coursedetailpage-basicinfo-content-info">
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程名称:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  高考数学冲刺训练班
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程年级:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  高三
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课程分类:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  数学
                </div>
              </div>
              <div class="coursedetailpage-basicinfo-content-info-single">
                <div class="coursedetailpage-basicinfo-content-info-single-require">*</div>
                <div class="coursedetailpage-basicinfo-content-info-single-label">课时:</div>
                <div class="coursedetailpage-basicinfo-content-info-single-data">
                  16
                </div>
              </div>
            </div>
          </div>
          <div class="coursedetailpage-basicinfo-content-row">
            <div class="coursedetailpage-basicinfo-content-info-intro">
              <div class="coursedetailpage-basicinfo-content-info-intro-require">*</div>
              <div class="coursedetailpage-basicinfo-content-info-intro-label">课程详情:</div>
              <div class="coursedetailpage-basicinfo-content-info-intro-data">
                本课程为高考数学冲刺训练班，主要针对高三学生进行数学知识的复习和巩固。课程内容涵盖了高考数学的各个知识点，包括函数、三角函数、立体几何、概率与统计等。课程采用互动式教学方式，通过讲解、练习和讨论等多种形式，帮助学生更好地理解和掌握数学知识。同时，课程还注重培养学生的数学思维能力，提高解题技巧和应试能力。适合高三学生进行数学复习和冲刺训练。
              </div>
            </div>
            <div class="coursedetailpage-basicinfo-content-mybalance">
              <div class="coursedetailpage-basicinfo-content-display">
                <div class="coursedetailpage-basicinfo-content-title">课程价格</div>
                <div class="coursedetailpage-basicinfo-content-money">￥1640</div>
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
          <el-table :data="tableData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
            :header-cell-style="headerCellStyle" border>
            <el-table-column label=" 序号" type="index" :index="indexMethod" width="150" />
            <el-table-column prop="id" label="编号" width="150" v-if="false" />
            <el-table-column prop="sectionName" label="章节名称" width="250" />
            <el-table-column prop="sectionStatus" label="章节状态" width="150" />
            <el-table-column prop="beginTime" label="开课时间" width="200" />
            <el-table-column prop="file" label="课程文件" width="160">
              <template #default="scope">
                <span v-if="scope.$index === 0" style="color: #1890ff; cursor: pointer;"
                  @click="downloadFile(scope.row.id)">点我试看</span>
                <span v-else>购买后可下载</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { courseDetailPageData } from '../mocks/courseDetailPage'

interface TablePageData {
  id: number
  sectionName: string
  sectionStatus: string
  beginTime: string
  file: string
}

const router = useRouter()

const buyDialogVisible = ref(false)
const tableData = ref<Array<TablePageData>>([])

onMounted(() => {
  tableData.value = courseDetailPageData
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

const goBack = () => {
  router.go(-1)
}

const downloadFile = (id: number) => {
  console.log(id)
  ElMessage.success('试看文件下载成功！')
}

</script>

<style>
@import url('../assets/css/views/courseDetailPage.css');
</style>