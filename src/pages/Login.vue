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
.login-page {
  width: 100vw;
  height: 100vh;
}

.login-container {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 45%;
  height: 40%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);

  .login-register {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    font-weight: bold;

    span {
      z-index: 100;
      margin-right: 5px;
      margin-top: 10px;
    }
  }

  .login-register::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 65px solid transparent;
    /* 左边框透明 */
    border-top: 65px solid orange;
    /* 底边框设置三角形的高度和颜色 */
  }

  .login-box {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;

    .login-wechat-qr {
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div:nth-child(1) {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 2%;
      }

      .qr-code {
        width: 50%;
        height: 50%;
        border: 1px solid #ccc;
      }
    }

    .login-form {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .login-type {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          font-size: 15px;
          cursor: pointer;
          border-bottom: 1px solid #000;
          padding: 5px 0;
          font-weight: bold;
        }

        span:nth-child(1) {
          margin-left: 5%;
        }

        span:nth-child(2) {
          margin-left: 15%;
        }

        .active {
          color: orange;
          border-bottom: 1px solid orange;
        }
      }

      .login-input {
        width: 100%;
        height: 50%;
        margin-top: 5%;
        margin-left: 10%;

        div {
          width: 70%;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          input {
            border: none;
            border-bottom: 1px solid #000;
            padding: 3% 0;
          }

          input:not(:last-child) {
            margin-bottom: 5%;
          }

          input:focus {
            outline: none;
            padding: 3% 0;
            border-bottom: 1px solid orange;
          }
        }
      }

      .login-checkbox {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;

        .checkbox {
          width: 12px;
          height: 12px;
        }

        span {
          font-size: 12px;

          span {
            cursor: pointer;
            color: orange;
          }

          span:hover {
            color: #ecb915;
          }
        }
      }

      .register-input {
        width: 100%;
        height: 60%;
        margin-top: 5%;
        margin-left: 10%;

        div {
          width: 70%;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          input {
            border: none;
            border-bottom: 1px solid #000;
            margin-bottom: 3%;
            padding: 3% 0;
          }

          input:focus {
            outline: none;
            padding: 3% 0;
            border-bottom: 1px solid orange;
          }
        }
      }

      .login-button {
        width: 100%;
        height: 20%;
        margin-left: 10%;

        button {
          width: 70%;
          height: 50%;
          background-color: orange;
          border: none;
          color: white;
          letter-spacing: 8px;
        }
      }
    }
  }
}

.login-bottom-text {
  width: 100%;
  height: 10%;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>