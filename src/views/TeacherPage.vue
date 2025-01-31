<template>
  <el-main class="teacherpage-view">
    <div class="teacherpage-header">
      教师管理
    </div>
    <div class="teacherpage-main">
      <div class="teacherpage-search">
        <el-input type="text" v-model="search_name_phone" placeholder="姓名或手机号"
          style="width: 240px; height: 40px; margin-right: 20px" />
        <el-select v-model="search_status" placeholder="状态" size="large" style="width: 240px; margin-right: 20px">
          <el-option v-for="item in searchStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" size="large" value-format="YYYY-MM-DD" />
        <el-button @click="search" size="large" type="primary">
          <el-icon :size="20" style="margin-right: 10px">
            <Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div class="teacherpage-result">
        <el-table :data="curPageData" :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle" border>
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="课程编号" width="150" v-if="false" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == 1" style="color: aqua;">启用</span>
              <span v-else style="color: red;">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="用户名" width="200" />
          <el-table-column prop="userName" label="姓名" width="150" />
          <el-table-column prop="phone" label="手机号" width="200" />
          <el-table-column prop="introduction" label="简介" width="200">
            <template #default="scope">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">{{
                scope.row.introduction }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="grade" label="年级" width="100" />
          <el-table-column prop="subject" label="科目" width="100" />
          <el-table-column prop="takePercent" label="抽成比" width="100">
            <template #default="scope">
              <span style="color: aqua;">{{ scope.row.takePercent }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalIncome" label="总收入" width="150">
            <template #default="scope">
              <span style="color: orange;">{{ scope.row.totalIncome }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="studentNum" label="学生数" width="100" />
          <el-table-column prop="createTime" label="创建时间" width="250" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="teacherpage-pagination">
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handlePageChange"
          @prev-click="handlePageChange" @next-click="handlePageChange" size="default" :default-page-size="15" />
      </div>
    </div>
  </el-main>

  <el-dialog v-model="teacherInfoDialogVisible" title="修改" width="500" align-center>
    <div class="teacherpage-dialog-row">
      <span class="teacherpage-dialog-span-require">*</span>
      <span class="teacherpage-dialog-span-text">抽成比：</span>
      <el-input v-model="teacherInfo.takePercent" placeholder="请输入" style="width: 120px;" />
      <span class="teacherpage-dialog-span-symbol">%</span>
    </div>
    <div class="teacherpage-dialog-row">
      <span class="teacherpage-dialog-span-require">*</span>
      <span class="teacherpage-dialog-span-text">账号状态：</span>
      <el-radio-group v-model="teacherInfo.status">
        <el-radio value="1">启用</el-radio>
        <el-radio value="0">禁用</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <div class="teacherpage-dialog-footer">
        <el-button @click="teacherInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { searchStatusOptions } from '../static/teacherPageData'
import {
  rowStyle,
  cellStyle,
  headerRowStyle,
  headerCellStyle,
} from '../public/tableStyle'
import { getAllTeacherInfoAPI, searchAllTeachernfoAPI, updateteacherTPAPI } from '../apis/user'

interface TeacherPageData {
  id: number
  phone: string
  totalIncome: number,
  createTime: string,
  nickName: string,
  subject: string,
  grade: string,
  takePercent: number,
  userName: string,
  studentNum: number,
  introduction: string,
  status: number
}

const search_date = ref('')
const search_status = ref('')
const search_name_phone = ref('')
const tableData = ref<Array<TeacherPageData>>([])
const curPageData = ref<Array<TeacherPageData>>([])
const pageSize = ref(15)
const curPage = ref(1)
const teacherInfo = ref({
  takePercent: 0,
  status: 0,
  id: "0"
})
const teacherInfoDialogVisible = ref(false)

onMounted(async () => {
  const teacherPageData = await getAllTeacherInfoAPI()
  tableData.value = teacherPageData.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
})

watch([search_date, search_name_phone, search_status], async ([newValOne, newValTwo, newValThree]) => {
  // 检查两个输入框是否同时为空
  if (newValOne === '' && newValTwo === '' && newValThree === '') {
    const teacherPageData = await getAllTeacherInfoAPI()
    tableData.value = teacherPageData.data
    curPageData.value = tableData.value.slice(0, pageSize.value)
    curPage.value = 1
  }
});

const handleEdit = (row: TeacherPageData) => {
  let data = {
    id: row.id,
    takePercent: row.takePercent,
    status: String(row.status)
  }
  teacherInfoDialogVisible.value = true
  teacherInfo.value = data
}

const handleConfirm = async () => {
  const data = {
    teacherId: teacherInfo.value.id,
    takePercent: teacherInfo.value.takePercent,
    status: teacherInfo.value.status
  }
  const res = await updateteacherTPAPI(data)
  if (res === 1) {
    ElMessage.success('修改成功！')
    teacherInfoDialogVisible.value = false
  } else {
    ElMessage.error('修改失败！')
  }
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
  const regex = /^1[3-9]\d{9}$/
  if (search_date.value === "" && search_name_phone.value === "" && search_status.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    username: "",
    phone: "",
    status: "",
    registerTime: ""
  }
  if (search_date.value !== "") {
    data.registerTime = search_date.value
  }
  if (search_status.value !== "") {
    data.status = String(search_status.value)
  }
  if (search_name_phone.value !== "" && regex.test(search_name_phone.value)) {
    data.phone = search_name_phone.value
  } else {
    data.username = search_name_phone.value
  }
  const res = await searchAllTeachernfoAPI(data)
  tableData.value = res.data
  curPageData.value = tableData.value.slice(0, pageSize.value)
  curPage.value = 1
}

</script>

<style>
@import url('../assets/css/views/teacherPage.css');
</style>