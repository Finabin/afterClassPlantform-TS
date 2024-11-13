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
            <span @click="changeLoginType" :class="{ active: isPasswordLogin }">账号密码登录</span>
            <span @click="changeLoginType" :class="{ active: !isPasswordLogin }">手机号登录</span>
          </div>
          <div class="login-input">
            <div v-if="isPasswordLogin">
              <input type="text" placeholder="请输入账号">
              <input type="password" placeholder="请输入密码">
            </div>
            <div v-else>
              <input type="text" placeholder="请输入手机号">
              <input type="password" placeholder="请输入密码">
            </div>
            <div class="login-checkbox">
              <span>我已阅读并同意<span>用户协议</span>、<span>隐私政策</span>、<span>产品服务协议</span></span>
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
              <input type="text" placeholder="请输入账号">
              <input type="password" placeholder="请输入密码">
              <input type="password" placeholder="请再次输入密码">
            </div>
            <div class="login-checkbox">
              <span>我已阅读并同意<span>用户协议</span>、<span>隐私政策</span>、<span>产品服务协议</span></span>
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
import { useRoute, useRouter } from 'vue-router'

const isPasswordLogin = ref(true)
const isLoginPage = ref(true)

const router = useRouter()
const route = useRoute()

const toLogin = () => {
  router.push('/home')
}

const toRegister = () => {
  isLoginPage.value = !isLoginPage.value
}

const changeLoginType = () => {
  isPasswordLogin.value = !isPasswordLogin.value
}

const changeLoginPage = () => {
  isLoginPage.value = !isLoginPage.value
}
</script>

<style lang="less" scoped>
@import '../assets/css/login.less';

</style>