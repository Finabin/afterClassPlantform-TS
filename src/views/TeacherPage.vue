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
        <button @click="search">搜索</button>
      </div>
      <div class="teacherpage-result">
        <el-table :data="tableData" style="width: 100%; margin: 20px;">
          <el-table-column label=" 序号" type="index" :index="indexMethod" width="100" />
          <el-table-column prop="id" label="课程编号" width="150" v-if="false" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <span v-if="scope.row.status == 1" style="color: aqua;">启用</span>
              <span v-else style="color: red;">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="200" />
          <el-table-column prop="nickName" label="姓名" width="150" />
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
      <div>
        <el-pagination background layout="prev, pager, next,sizes" :total="tableData.length" :page-sizes="[5, 15, 30]"
          v-model="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          @prev-click="handlePrevClick" @next-click="handleNextClick" />
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
        <el-button type="primary" @click="teacherInfoDialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { searchStatusOptions } from '../static/teacherPageData'
import teacherPageData from '../mocks/teacherPage'

interface TeacherPageData {
  id: number
  username: string
  nickname: string
  phone: string
  buyCourseNum: number
  registerTime: string
}

const search_date = ref('')
const search_status = ref('')
const search_name_phone = ref('')
const tableData = ref<Array<TeacherPageData>>([])
const pageSize = ref(5)
const teacherInfo = ref({
  takePercent: "",
  status: ""
})
const teacherInfoDialogVisible = ref(false)

onMounted(() => {
  tableData.value = teacherPageData
})

const handleEdit = (row: TeacherPageData) => {
  row.status = row.status.toString()
  teacherInfoDialogVisible.value = true
  teacherInfo.value = row
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
  if (search_date.value === "" && search_name_phone.value === "" && search_status.value === "") {
    ElMessage.warning('请输入搜索条件!')
    return
  }
  let data = {
    nickName: "",
    phone: "",
    status: "",
    registerTime: ""
  }
  if (search_date.value !== "") {
    data.registerTime = search_date.value
  }
  if (search_status.value !== "") {
    data.status = search_status.value
  }
  if (search_name_phone.value !== "" && regex.test(search_name_phone.value)) {
    data.registerTime = search_date.value
    data.phone = search_name_phone.value
  } else {
    data.registerTime = search_date.value
    data.nickName = search_name_phone.value
  }
  console.log(data);
}

</script>

<style>
@import url('../assets/css/views/teacherPage.css');
</style>