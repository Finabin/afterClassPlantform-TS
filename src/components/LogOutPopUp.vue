<template>
  <div class="overlay" v-if="popUpClosed === false">
    <div class="logout-popup">
      <div class="logout-popup-header">
        <span class="logout-popup-header-title">退出登录</span>
        <span @click="popUpClosed = true"><el-icon>
            <Close />
          </el-icon></span>
      </div>
      <div class="logout-popup-main">
        确认退出登录?
      </div>
      <div class="logout-popup-footer">
        <button class="logout-popup-footer-cancel" @click="popUpClosed = true">取消</button>
        <button class="logout-popup-footer-confirm" @click="logOut">确认</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Close } from '@element-plus/icons-vue'

const router = useRouter();

const popUpClosed = ref(false);

const logOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
  popUpClosed.value = true
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/logOutPopUp.less');
</style>
