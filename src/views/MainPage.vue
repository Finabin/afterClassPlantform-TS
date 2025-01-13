<template>
  <el-main class="mainpage-view">
    <div class="mainpage-header">
      首页
    </div>
    <div class="mainpage-main">
      <div class="mainpage-selectarea">
        <div class="mainpage-selectarea-row">
          <div class="mainpage-selectarea-single">
            <div class="mainpage-selectarea-single-title">科目</div>
            <el-select v-model="search_subject" placeholder="请选择科目" size="large"
              style="width: 240px; margin-right: 20px">
              <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-selectarea-single">
            <div class="mainpage-selectarea-single-title">年级</div>
            <el-select v-model="search_grade" placeholder="请选择年级" size="large" style="width: 240px; margin-right: 20px">
              <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-selectarea-single">
            <div class="mainpage-selectarea-single-title">课时</div>
            <el-select v-model="search_classHour" placeholder="请选择课时" size="large"
              style="width: 240px; margin-right: 20px">
              <el-option v-for="item in classHour" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="mainpage-selectarea-row">
          <div class="mainpage-selectarea-single">
            <div class="mainpage-selectarea-single-title">课程销量</div>
            <el-select v-model="search_salesRange" placeholder="请选择销量范围" size="large"
              style="width: 240px; margin-right: 20px">
              <el-option v-for="item in salesRange" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-selectarea-single">
            <div class="mainpage-selectarea-single-title">关键词</div>
            <el-input v-model="search_keyword" placeholder="请输入关键词" style="width:240px; height: 38px;" />
          </div>
          <div class="mainpage-selectarea-single">
            <el-button type="primary" @click="search" class="mainpage-selectarea-single-button-search">搜索</el-button>
            <el-button @click="reset" class="mainpage-selectarea-single-button-reset">重置</el-button>
          </div>
        </div>
      </div>

      <div class="mainpage-recommend">
        <MainFilterListItem v-for="item in recommendData" :key="item.id" :courseData="item" />
      </div>
      <div class="mainpage-bestselling-label">
        畅销榜
      </div>
      <div class="mainpage-bestselling">
        <MainFilterListItem v-for="item in bestSellingData" :key="item.id" :courseData="item" />
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import MainFilterListItem from '../components/MainFilterListItem.vue'
import { gradeOptions, subjectOptions, salesRange, classHour } from '../static/mainPageData'
import { courseGoodSold, courseRecommend } from '../mocks/mainPage'

interface MainPageData {
  id: number,
  courseImg: string,
  courseName: string
  courseIntro: string,
  coursePrice: number,
  courseSold: number,
}

const search_subject = ref('')
const search_classHour = ref('')
const search_grade = ref('')
const search_salesRange = ref('')
const search_keyword = ref('')
const recommendData = ref<Array<MainPageData>>([])
const bestSellingData = ref<Array<MainPageData>>([])
const pageSize = ref(5)

onMounted(() => {
  recommendData.value = courseRecommend
  bestSellingData.value = courseGoodSold
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

</script>

<style>
@import url('../assets/css/views/mainPage.css');
</style>