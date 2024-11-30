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
          <div class="qr-code"></div>
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
              <input type="text" placeholder="请输入手机号" v-model="loginPhone">
              <input type="password" placeholder="请输入密码" v-model="loginPPassword">
            </div>
            <div class="login-checkbox">
              <input type="checkbox"
                class="checkbox" /><span>我已阅读并同意<span>用户协议</span>、<span>隐私政策</span>、<span>产品服务协议</span></span>
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
              <div class="checkbox">
                <input type="checkbox" />
              </div>
              <div class="login-checkbox-text">
                <span>我已阅读并同意<span>用户协议</span>、<span>隐私政策</span>、<span>产品服务协议</span></span>
              </div>
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
import { useRoute, useRouter } from 'vue-router'
import user from '@/mocks/user'

const isPasswordLogin = ref(true)
const isLoginPage = ref(true)
const loginNickname = ref('')
const loginNPassword = ref('')
const loginPhone = ref('')
const loginPPassword = ref('')
const registerNickname = ref('')
const registerPassword = ref('')
const registerRPassword = ref('')

const router = useRouter()
const route = useRoute()

const toLogin = () => {
  if (isPasswordLogin.value) {
    if (loginNickname.value === '' || loginNPassword.value === '') {
      ElMessage({
        message: '账号或密码不能为空',
        type: 'error',
      })
      return
    }
    for (let i = 0; i < user.length; i++) {
      if (loginNickname.value === user[i].nickName && loginNPassword.value === user[i].password) {
        ElMessage.success('登录成功')
        router.push('/home')
        return
      }
    }
    ElMessage({
      message: '账号或密码错误',
      type: 'error',
    })
  }
  else {
    if (loginPhone.value === '' || loginPPassword.value === '') {
      ElMessage({
        message: '手机号或密码不能为空',
        type: 'error',
      })
      return
    }
    router.push('/home')
  }
}

const toRegister = () => {
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
  ElMessage.success('注册成功')
  isLoginPage.value = !isLoginPage.value
  registerNickname.value = ''
  registerPassword.value = ''
  registerRPassword.value = ''
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