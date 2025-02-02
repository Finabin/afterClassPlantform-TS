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
            <el-input v-model="search_keyword" placeholder="请输入姓名、用户名" style="width:240px; height: 38px;" />
          </div>
          <div class="mainpage-selectarea-single">
            <el-button type="primary" @click="search" class="mainpage-selectarea-single-button-search"><el-icon
                :size="20" style="margin-right: 10px">
                <Search />
              </el-icon>搜索</el-button>
            <el-button @click="reset" class="mainpage-selectarea-single-button-reset"><el-icon :size="20"
                style="margin-right: 10px;">
                <RefreshRight />
              </el-icon>重置</el-button>
          </div>
        </div>
      </div>

      <div class="mainpage-recommend">
        <MainFilterListItem v-for="item in recommendData" :key="item.id" :courseData="item" />
        <div class="mainpage-pagination">
          <el-pagination background layout="prev, pager, next" :total="recommendData.length" v-model="pageSize"
            @current-change="handlePageChange" @prev-click="handlePageChange" @next-click="handlePageChange"
            size="default" />
        </div>
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
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import MainFilterListItem from '../components/MainFilterListItem.vue'
import { gradeOptions, subjectOptions, salesRange, classHour } from '../static/mainPageData'
import { getMainPageDataAPI, getGoodSellingDataAPI, getSearchDataAPI } from '../apis/main'

interface MainPageData {
  id: number,
  cover: string,
  courseName: string
  introduction: string,
  price: number,
  sellNum: number,
}

const search_subject = ref('')
const search_classHour = ref('')
const search_grade = ref('')
const search_salesRange = ref('')
const search_keyword = ref('')
const tableData = ref<Array<MainPageData>>([])
const recommendData = ref<Array<MainPageData>>([])
const bestSellingData = ref<Array<MainPageData>>([])
const pageSize = ref(4)
const curPage = ref(1)

onMounted(async () => {
  const recommendList = await getMainPageDataAPI()
  const courseGoodSoldList = await getGoodSellingDataAPI()
  tableData.value = recommendList.data
  recommendData.value = tableData.value.slice(0, pageSize.value)
  bestSellingData.value = courseGoodSoldList.data
})

watch([search_subject, search_classHour, search_grade, search_salesRange, search_keyword], async ([newValOne, newValTwo, newValThree, newValFour, newValFive]) => {
  // 检查两个输入框是否同时为空
  if (newValOne === '' && newValTwo === '' && newValThree === '' && newValFour === '' && newValFive === '') {
    const coursePageData = await getMainPageDataAPI()
    tableData.value = coursePageData.data
    recommendData.value = tableData.value.slice(0, pageSize.value)
    curPage.value = 1
  }
});

const reset = () => {
  search_subject.value = ''
  search_classHour.value = ''
  search_grade.value = ''
  search_salesRange.value = ''
  search_keyword.value = ''
}

const handlePageChange = (val: number) => {
  curPage.value = val
  recommendData.value = search_data.value.slice(pageSize.value * (curPage.value - 1), pageSize.value * curPage.value)
}

const search = async () => {
  if (search_subject.value === "" && search_classHour.value === "" && search_grade.value === "" && search_salesRange.value === "" && search_keyword.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    classification: search_subject.value,
    grade: search_grade.value,
    courseTime: [],
    sellNum: [],
    username: search_keyword.value,
    nickname: search_keyword.value
  }
  if (search_classHour.value !== "") {
    if (search_classHour.value === "1") {
      data.courseTime = [5, 10]
    } else if (search_classHour.value === "2") {
      data.courseTime = [11, 15]
    } else if (search_classHour.value === "3") {
      data.courseTime = [16, 20]
    } else if (search_classHour.value === "4") {
      data.courseTime = [21]
    }
  }
  if (search_salesRange.value !== "") {
    if (search_salesRange.value === "1") {
      data.sellNum = [1, 50]
    } else if (search_salesRange.value === "2") {
      data.sellNum = [51, 100]
    } else if (search_salesRange.value === "3") {
      data.sellNum = [101, 200]
    } else if (search_salesRange.value === "4") {
      data.sellNum = [201, 500]
    } else if (search_salesRange.value === "5") {
      data.sellNum = [501]
    }
  }
  console.log(data);
  const res = await getSearchDataAPI(data)
  console.log(res);
  if (res.code === 1) {
    tableData.value = res.data || []
  } else {
    tableData.value = []
    ElMessage.error('不存在相关课程!')
  }
  recommendData.value = tableData.value.slice(0, pageSize.value)
}

</script>

<style>
@import url('../assets/css/views/mainPage.css');
</style>