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
            <div>
              <el-avatar :size="100" :src="circleUrl" />
            </div>
            <div class="personinfo-upload">
              <el-upload :http-request="uploadAvatar" :show-file-list="false" :limit="1"
                :before-upload="beforeAvatarUpload">
                <div class="personinfo-upload-btn">点击修改</div>
              </el-upload>
              <div class="personinfo-upload-tip">支持.jpg.png等类型文件，2M以内</div>
            </div>
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
              <el-select v-model="update_info.gender" placeholder="请选择" size="large"
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
              <el-input v-model="update_info.introduction" style="width: 500px" :rows="4" type="textarea"
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
              <span v-if="origin_info.gender === 1">男</span>
              <span v-else>女</span>
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
              <span>{{ origin_info.introduction }}</span>
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
import { uploadFileAPI } from '@/apis/system'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus'


const userInfoStore = useUserInfoStore();
const { id } = storeToRefs(userInfoStore);
const circleUrl = ref('')
const isUpdate = ref(false)
const origin_info = ref({
  nickname: '',
  gender: -1,
  username: '',
  phone: '',
  grade: '',
  subject: '',
  introduction: ''
})
const update_info = ref({
  nickname: '',
  gender: -1,
  username: '',
  phone: '',
  grade: [],
  subject: [],
  introduction: ''
})

onMounted(async () => {
  const data = {
    userId: Number(id.value)
  }
  const res = await getPersonalInfoAPI(data)
  if (res.code === 1) {
    origin_info.value = res.data[0]
    circleUrl.value = res.data[0].avatar
  }
})

const uploadAvatar = async ({ file }: any) => {
  const formData = new FormData()
  formData.append('image', file)
  const res = await uploadFileAPI(formData)
  if (res.code === 1) {
    circleUrl.value = res.data
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小需小于2MB!')
    return false
  }
  return true
}

const updatePersonInfo = () => {
  isUpdate.value = true
  let grade
  if (!origin_info.value.grade) {
    grade = []
  } else {
    grade = origin_info.value.grade.split(" ")
  }
  let subject
  if (!origin_info.value.subject) {
    subject = []
  } else {
    subject = origin_info.value.subject.split(" ")
  }
  update_info.value.grade = grade
  update_info.value.subject = subject
  update_info.value.nickname = origin_info.value.nickname
  update_info.value.username = origin_info.value.username
  update_info.value.phone = origin_info.value.phone
  update_info.value.introduction = origin_info.value.introduction
  update_info.value.gender = origin_info.value.gender
}

const checkValid = () => {
  if (!update_info.value.nickname) {
    ElMessage.error("昵称不能为空!")
    return false
  }
  if (!update_info.value.username) {
    ElMessage.error("用户名不能为空!")
    return false
  }
  if (!update_info.value.phone) {
    ElMessage.error("手机号不能为空!")
    return false
  }
  if (!update_info.value.grade.length) {
    ElMessage.error("年级不能为空!")
    return false
  }
  if (!update_info.value.subject.length) {
    ElMessage.error("科目不能为空!")
    return false
  }
  if (!update_info.value.introduction) {
    ElMessage.error("简介不能为空!")
    return false
  }
  return true
}

const savePersonInfo = async () => {
  if (!checkValid()) {
    return
  }
  let grade = update_info.value.grade.join(" ")
  let subject = update_info.value.subject.join(" ")
  const data = {
    id: Number(id.value),
    nickname: update_info.value.nickname,
    gender: update_info.value.gender,
    username: update_info.value.username,
    phone: update_info.value.phone,
    grade: grade,
    subject: subject,
    introduction: update_info.value.introduction,
    avatar: circleUrl.value
  }
  const res = await updatePersonalInfoAPI(data)
  if (res.code === 1) {
    isUpdate.value = false
    origin_info.value = data
    ElMessage.success("修改成功!")
  } else {
    ElMessage.error("修改失败!")
  }
}

</script>

<style scoped lang="less">
@import url(../assets/css/views/personInfo.css);
</style>