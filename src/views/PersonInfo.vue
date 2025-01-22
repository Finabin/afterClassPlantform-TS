<template>
  <el-main class="personinfo-view">
    <div class="personinfo-header">
      个人信息
    </div>
    <div class="personinfo-main">
      <div @click="updatePersonInfo" class="personinfo-update" v-if="!isUpdate"><span>修改</span></div>
      <div class="personinfo-container">
        <div class="personinfo-update-form" v-if="isUpdate">
          <div class="personinfo-row">
            <el-avatar :size="100" :src="circleUrl" />
          </div>
          <div class="personinfo-row">
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">用户名:</span>
              <el-input v-model="update_info.nickname" placeholder="请输入" style="width: 240px; height: 38px;" />
            </div>
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">性别:</span>
              <el-select v-model="update_info.sex" placeholder="请选择" size="large"
                style="width: 240px; margin-right: 20px">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="personinfo-row">
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">姓名:</span>
              <el-input v-model="update_info.username" placeholder="请输入" style="width: 240px; height: 38px;" />
            </div>
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">手机:</span>
              <el-input v-model="update_info.phone" placeholder="请输入" style="width: 240px; height: 38px;" />
            </div>
          </div>
          <div class="personinfo-row">
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">年级:</span>
              <el-select v-model="update_info.grade" multiple placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">科目:</span>
              <el-select v-model="update_info.subject" multiple placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="personinfo-row">
            <div class="personinfo-single">
              <span class="personinfo-require">*</span>
              <span class="personinfo-title">简介:</span>
              <el-input v-model="update_info.introduce" style="width: 500px" :rows="4" type="textarea"
                placeholder="请输入简介，不超过200字" />
            </div>
          </div>
          <div class="personinfo-row">
            <div class="personinfo-single">
              <el-button type="primary" @click="savePersonInfo" style="width: 150px; height: 40px;">确认</el-button>
            </div>
          </div>
        </div>
        <div class="personinfo-origin-form" v-else>
          <div class="personinfo-origin-row">
            <el-avatar :size="100" :src="circleUrl" />
          </div>
          <div class="personinfo-origin-row">
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">用户名:</span>
              <span>{{ origin_info.nickname }}</span>
            </div>
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">性别:</span>
              <span>{{ origin_info.sex }}</span>
            </div>
          </div>
          <div class="personinfo-origin-row">
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">姓名:</span>
              <span>{{ origin_info.username }}</span>
            </div>
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">手机:</span>
              <span>{{ origin_info.phone }}</span>
            </div>
          </div>
          <div class="personinfo-origin-row">
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">年级:</span>
              <span>{{ origin_info.grade }}</span>
            </div>
            <div class="personinfo-origin-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">科目:</span>
              <span>{{ origin_info.subject }}</span>
            </div>
          </div>
          <div class="personinfo-origin-row-last">
            <div class="personinfo-origin-last-single">
              <span class="personinfo-origin-require">*</span>
              <span class="personinfo-origin-title">简介:</span>
              <span>{{ origin_info.introduce }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { sexOptions, gradeOptions, subjectOptions } from '../static/personInfoData'
import { getPersonalInfoAPI, updatePersonalInfoAPI } from '../apis/user'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus'


const userInfoStore = useUserInfoStore();
const { id } = storeToRefs(userInfoStore);
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const isUpdate = ref(false)
const origin_info = ref({
  nickname: '',
  sex: '',
  username: '',
  phone: '',
  grade: '',
  subject: '',
  introduce: ''
})
const update_info = ref({
  nickname: '',
  sex: {
    value: '',
    label: ''
  },
  username: '',
  phone: '',
  grade: {
    value: '',
    label: ''
  },
  subject: {
    value: '',
    label: ''
  },
  introduce: ''
})

onMounted(async () => {
  const data = {
    userId: Number(id.value)
  }
  const res = await getPersonalInfoAPI(data)
  if (res.code === 1) {
    origin_info.value = res.data
  }
})

const updatePersonInfo = () => {
  isUpdate.value = true
  update_info.value.grade = {
    value: origin_info.value.grade,
    label: origin_info.value.grade
  }
  update_info.value.subject = {
    value: origin_info.value.subject,
    label: origin_info.value.subject
  }
  update_info.value.nickname = origin_info.value.nickname
  update_info.value.username = origin_info.value.username
  update_info.value.phone = origin_info.value.phone
  update_info.value.introduce = origin_info.value.introduce
  if (origin_info.value.sex === '男') {
    update_info.value.sex = {
      value: '0',
      label: '男'
    }
  } else {
    update_info.value.sex = {
      value: '1',
      label: '女'
    }
  }
}

const savePersonInfo = async () => {
  const data = {
    id: Number(id.value),
    nickname: update_info.value.nickname,
    gender: Number(update_info.value.sex.value),
    username: update_info.value.username,
    phone: update_info.value.phone,
    grade: update_info.value.grade.label,
    subject: update_info.value.subject.label,
    introduce: update_info.value.introduce
  }
  const res = await updatePersonalInfoAPI(data)
  if (res.code === 1) {
    isUpdate.value = false
  } else {
    ElMessage.error("修改失败!")
  }
}

</script>

<style scoped lang="less">
@import url(../assets/css/views/personInfo.css);
</style>