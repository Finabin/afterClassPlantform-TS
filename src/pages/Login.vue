<template>
  <div class="login-page">
    <div class="login-container">
      <div @click="changeLoginPage" v-if="isLoginPage" class="login-register">
        <span>注册</span>
      </div>
      <div @click="changeLoginPage" v-else class="login-register">
        <span>登录</span>
      </div>
      <div class="login-box">
        <div class="login-wechat-qr">
          <div>扫码登录</div>
          <div class="qr-code">
            <img src="../assets/images/qrcode.png" alt="" style="width: 150px; height: auto;">
          </div>
          <div>
            <img src="../assets/images/wechat.png" alt="" style="width: 30px; height: auto;">
          </div>
        </div>
        <div class="login-form" v-if="isLoginPage">
          <div class="login-type">
            <span @click="changeLoginType(1)" :class="{ active: isPasswordLogin }">账号密码登录</span>
            <span @click="changeLoginType(2)" :class="{ active: !isPasswordLogin }">手机号登录</span>
          </div>
          <div class="login-input">
            <div v-if="isPasswordLogin">
              <input type="text" placeholder="请输入账号" v-model="loginNickname">
              <input type="password" placeholder="请输入密码" v-model="loginNPassword">
            </div>
            <div v-else>
              <div>
                <input type="text" placeholder="+86" class="login-phone-prefix" disabled>
                <input type="text" placeholder="请输入手机号" v-model="loginPhone" class="login-phone-input">
              </div>
              <input type="password" placeholder="请输入密码" v-model="loginPPassword">
            </div>
            <div class="login-checkbox">
              <input type="checkbox" class="login-checkbox-input" v-model="agreement" />
              <label for="agreementCheckbox" class="login-checkbox-text">
                我已阅读并同意
                <span>用户协议</span>、
                <span>隐私政策</span>、
                <span>产品服务协议</span>
              </label>
            </div>
          </div>
          <div class="login-button">
            <el-button @click="toLogin">登录</el-button>
          </div>
        </div>
        <div class="login-form" v-else>
          <div class="login-type">
            <span style="color: orange; border-bottom: 1px solid orange;">账号注册</span>
          </div>
          <div class="register-input">
            <div>
              <input type="text" placeholder="请输入账号" v-model="registerNickname">
              <input type="password" placeholder="请输入密码" v-model="registerPassword">
              <input type="password" placeholder="请再次输入密码" v-model="registerRPassword">
            </div>
            <div class="login-checkbox">
              <input type="checkbox" class="login-checkbox-input" v-model="agreement" />
              <label for="agreementCheckbox" class="login-checkbox-text">
                我已阅读并同意
                <span>用户协议</span>、
                <span>隐私政策</span>、
                <span>产品服务协议</span>
              </label>
            </div>
          </div>
          <div class="login-button">
            <el-button @click="toRegister">注册</el-button>
          </div>
        </div>
      </div>
      <div class="login-bottom-text">登录视为您已同意第三方账号绑定协议、用户协议、隐私政策、产品服务协议</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { LoginAPI, registerAPI, LoginByPhoneAPI } from '@/apis/login'
import useUserInfoStore from "@/stores/user";
import useMenuIndexStore from '@/stores/menu';
import { storeToRefs } from "pinia";

const isPasswordLogin = ref(true)
const isLoginPage = ref(true)
const loginNickname = ref('')
const loginNPassword = ref('')
const loginPhone = ref('')
const loginPPassword = ref('')
const registerNickname = ref('')
const registerPassword = ref('')
const registerRPassword = ref('')
const userInfoStore = useUserInfoStore();
const agreement = ref(false)

const router = useRouter()
const menuIndexStore = useMenuIndexStore();
const { curMenuIndex } = storeToRefs(menuIndexStore);

const toLogin = async () => {
  if (!agreement.value) {
    ElMessage({
      message: '请勾选同意协议',
      type: 'warning',
    })
    return
  }
  if (isPasswordLogin.value) {
    if (loginNickname.value === '' || loginNPassword.value === '') {
      ElMessage({
        message: '账号或密码不能为空',
        type: 'error',
      })
      return
    }
    const data = {
      nickname: loginNickname.value,
      password: loginNPassword.value
    }
    const res = await LoginAPI(data)
    if (res.code === 1) {
      userInfoStore.id = res.data.id
      userInfoStore.nickName = res.data.nickName
      userInfoStore.role = res.data.role
      userInfoStore.avatar = res.data.avatar
      userInfoStore.token = res.data.token
      if (userInfoStore.role == "1") {
        curMenuIndex.value = "/main"
        router.push('/home')
      } else {
        curMenuIndex.value = "/datasource"
        router.push('/datasource')
      }
    } else if (res.code === 0) {
      ElMessage({
        message: '账号或密码错误',
        type: 'error',
      })
    }
  }
  else {
    if (loginPhone.value === '' || loginPPassword.value === '') {
      ElMessage({
        message: '手机号或密码不能为空',
        type: 'error',
      })
      return
    }
    const data = {
      phone: loginPhone.value,
      password: loginPPassword.value
    }
    console.log(data);

    const res = await LoginByPhoneAPI(data)
    console.log(res);

    if (res.code === 1) {
      userInfoStore.id = res.data.id
      userInfoStore.nickName = res.data.nickName
      userInfoStore.role = res.data.role
      userInfoStore.avatar = res.data.avatar
      userInfoStore.token = res.data.token
      if (userInfoStore.role == "1") {
        curMenuIndex.value = "/main"
        router.push('/home')
      } else {
        curMenuIndex.value = "/datasource"
        router.push('/datasource')
      }
    } else if (res.code === 0) {
      ElMessage({
        message: '账号或密码错误',
        type: 'error',
      })
    }
  }
}

const toRegister = async () => {
  if (registerNickname.value === '' || registerPassword.value === '' || registerRPassword.value === '') {
    ElMessage({
      message: '账号或密码不能为空',
      type: 'error',
    })
    return
  }
  if (registerPassword.value.length < 8) {
    ElMessage({
      message: '密码长度不能小于8位',
      type: 'error',
    })
    return
  }
  if (registerPassword.value !== registerRPassword.value) {
    ElMessage({
      message: '两次输入的密码不一致',
      type: 'error',
    })
    return
  }
  const data = {
    nickname: registerNickname.value,
    password: registerPassword.value
  }
  const res = await registerAPI(data)
  if (res.code === 1) {
    ElMessage.success('注册成功')
    isLoginPage.value = !isLoginPage.value
    registerNickname.value = ''
    registerPassword.value = ''
    registerRPassword.value = ''
  } else {
    ElMessage.error('注册失败')
  }
}

const changeLoginType = (value: number) => {
  if (value === 1) {
    isPasswordLogin.value = true
  }
  else {
    isPasswordLogin.value = false
  }
}

const changeLoginPage = () => {
  isLoginPage.value = !isLoginPage.value
}
</script>

<style lang="less" scoped>
@import '../assets/css/pages/login.less';
</style>