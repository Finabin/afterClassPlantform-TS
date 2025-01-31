<template>
  <el-main class="incomepage-view">
    <div class="incomepage-header">
      收入管理
    </div>
    <div class="incomepage-main">
      <div class="incomepage-income-data" v-if="role === '1'">
        <div class="incomepage-income-data-myincome">
          <div class="incomepage-income-data-display">
            <div class="incomepage-income-data-title">我的收入</div>
            <div class="incomepage-income-data-money">￥{{ incomePageData.personalIncomeData.income }}</div>
          </div>
          <div class="incomepage-income-data-symbol">
            <span>￥</span>
          </div>
        </div>
        <div class="incomepage-income-data-mybalance">
          <div class="incomepage-income-data-display">
            <div class="incomepage-income-data-title">我的余额</div>
            <div class="incomepage-income-data-money">￥{{ incomePageData.personalIncomeData.balance }}</div>
          </div>
          <div class="incomepage-income-data-symbol">
            <span>￥</span>
          </div>
          <div class="incomepage-income-data-button">
            <el-button type="primary" @click="IncomeDialogVisible = true"
              style="width: 120px; height: 75px; background: #FF9900; color: #fff; border-radius: 10px; font-size: 18px;">去提现</el-button>
          </div>
        </div>
      </div>
      <div class="incomepage-search">
        <el-input type="text" v-model="search_nickName" placeholder="用户名"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-input type="text" v-model="search_teacherName" placeholder="老师"
          style="width: 180px; height: 40px; margin-right: 20px" />
        <el-select v-model="search_processType" placeholder="处理类型" size="large"
          style="width: 240px; margin-right: 20px">
          <el-option v-for="item in searchProcessTypeOptions" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div class="incomepage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="150" />
          <el-table-column prop="id" label="编号" width="150" v-if="false" />
          <el-table-column prop="nickName" label="用户名" width="250" />
          <el-table-column prop="teacherName" label="老师" width="200" />
          <el-table-column prop="processType" label="处理类型" width="150">
            <template #default="scope">
              <span v-if="scope.row.processType === '提现'" style="color: orange;">提现</span>
              <span v-else style="color: aqua;">收入</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="处理金额" width="160">
            <template #default="scope">
              <span v-if="scope.row.processType === 1" style="color: orange;">{{ scope.row.money }}</span>
              <span v-else style="color: aqua;">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="moneyBefore" label="处理前金额" width="160" />
          <el-table-column prop="applicteTime" label="申请时间" width="300" />
        </el-table>
      </div>
      <div class="incomepage-pagination">
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handlePageChange"
          @prev-click="handlePageChange" @next-click="handlePageChange" size="default" :default-page-size="15" />
      </div>
    </div>

    <IncomeDialog v-if="IncomeDialogVisible" :IncomeDialogVisible="IncomeDialogVisible"
      @custom-event="handleIncomeDialogVisibleChange" />
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { searchProcessTypeOptions } from '../static/incomePageData'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { getAllIncomeAPI, getTeacherIncomeAPI, searchTeacherIncomeAPI, searchAllIncomeAPI } from '../apis/income'
import IncomeDialog from '../components/IncomeDialog.vue'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

interface IncomePageData {
  id: number
  nickName: string
  teacherName: number
  processType: number,
  money: number,
  moneyBefore: number,
  applicteTime: string,
}

const userInfoStore = useUserInfoStore();
const { role, id } = storeToRefs(userInfoStore);
const search_date = ref('')
const search_processType = ref('')
const search_nickName = ref('')
const search_teacherName = ref('')
const tableData = ref<Array<IncomePageData>>([])
const IncomeDialogVisible = ref(false)
const curPageData = ref<Array<IncomePageData>>([])
const pageSize = ref(15)
const curPage = ref(1)

const getIncomPageData = async () => {
  let incomePageData
  if (role.value != '2') {
    incomePageData = await getAllIncomeAPI()
  } else {
    const data = {
      teacher_id: Number(id.value)
    }
    incomePageData = await getTeacherIncomeAPI(data)
  }
  return incomePageData
}

onMounted(async () => {
  const incomePageData = await getIncomPageData()
  tableData.value = incomePageData.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_processType, search_nickName, search_teacherName], async ([newValOne, newValTwo, newValThree, newValFour]) => {
  if (newValOne === '' && newValTwo === '' && newValThree === '' && newValFour === '') {
    const incomePageData = await getIncomPageData()
    tableData.value = incomePageData.data
    curPageData.value = tableData.value.slice(0, pageSize.value)
    curPage.value = 1
  }
});

const handleIncomeDialogVisibleChange = (visible: boolean) => {
  IncomeDialogVisible.value = visible
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
  if (search_date.value === "" && search_processType.value === "" && search_nickName.value === "" && search_teacherName.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    type: search_processType.value,
    nickname: search_nickName.value,
    applictetime: search_date.value,
    username: search_teacherName.value,
  }
  if (role.value !== '0') {
    data['id'] = Number(id.value)
    res = await searchTeacherIncomeAPI(data)
  } else {
    res = await searchAllIncomeAPI(data)
  }
  tableData.value = res.data || []
  curPageData.value = tableData.value.slice(0, pageSize.value)
  curPage.value = 1
}

</script>

<style>
@import url('../assets/css/views/incomePage.css');
</style>