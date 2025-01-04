<template>
  <el-main>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/course' }">课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div>
        <input type="text" v-model="search_name_phone" placeholder="姓名或手机号" />
        <el-select v-model="search_course_state" placeholder="选择课程状态" size="large" style="width: 240px">
          <el-option v-for="item in courseState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="search_course_kind" placeholder="选择课程分类" size="large" style="width: 240px">
          <el-option v-for="item in subjectSelection" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-model="search_date" type="date" placeholder="选择一个日期" :size="size" />
        <button>搜索</button>
      </div>
      <div>
        <button @click="addCourse">增加</button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column label="序号" type="index" :index="indexMethod" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="date" label="课程名称" width="150" />
        <el-table-column prop="name" label="展示状态" width="120" />
        <el-table-column prop="state" label="课程状态" width="120" />
        <el-table-column prop="city" label="分类" width="120" />
        <el-table-column prop="address" label="封面图" width="200" />
        <el-table-column prop="zip" label="老师" width="120" />
        <el-table-column prop="zip" label="年级" width="120" />
        <el-table-column prop="zip" label="课时" width="120" />
        <el-table-column prop="zip" label="价格" width="120" />
        <el-table-column prop="zip" label="开课时间" width="120" />
        <el-table-column prop="zip" label="创建时间" width="120" />
        <el-table-column fixed="right" label="操作" min-width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="updateCourseDialogVisible = true">
              修改
            </el-button>
            <el-button link type="primary" size="small" @click="checkCourse(scope.row.id)">
              查看课程
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>

  <el-dialog v-model="updateCourseDialogVisible" title="修改" width="500" align-center>
    <div>
      <span>展示状态:</span>
      <el-radio-group v-model="displayStateUpdate">
        <el-radio value="0" size="large">已上架</el-radio>
        <el-radio value="1" size="large">未上架</el-radio>
      </el-radio-group>
    </div>
    <div>
      <span>课程状态:</span>
      <el-radio-group v-model="courseStateUpdate">
        <el-radio value="0" size="large">未开课</el-radio>
        <el-radio value="1" size="large">开课中</el-radio>
        <el-radio value="2" size="large">已开课</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateCourseDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateCourse">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { courseState, subjectSelection } from '@/mocks/courseData'

const router = useRouter()
const route = useRoute()

const now = new Date()
const search_date = ref(dayjs(now).format('YYYY-MM-DD'))
const search_course_state = ref('')
const search_course_kind = ref('')
const search_name_phone = ref('')
const updateCourseDialogVisible = ref(false)
const displayStateUpdate = ref('0')
const courseStateUpdate = ref('0')

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const indexMethod = (index: number) => {
  return index++
}

const checkCourse = (id: number) => {
  router.push('/course/edit/')
  // router.push('/course/edit/' + id)
}

const addCourse = (id: number) => {
  router.push('/course/add/')
  // router.push('/course/add/' + id)
}

const updateCourse = () => {
  updateCourseDialogVisible.value = false
  console.log(displayStateUpdate.value, courseStateUpdate.value);
}


</script>