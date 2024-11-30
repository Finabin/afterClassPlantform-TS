<template>
  <div class="overlay" v-if="popUpClosed === false">
    <div class="updatepassword-popup">
      <div class="updatepassword-popup-header">
        <span class="updatepassword-popup-header-title">修改密码</span>
        <span @click="popUpClosed = true"><el-icon>
            <Close />
          </el-icon></span>
      </div>
      <div class="updatepassword-popup-main">
        <div>
          <span>账号:</span>
          <el-input v-model="nickName" disabled />
        </div>
        <div>
          <span>新密码:</span>
          <el-input v-model="newPassword" placeholder="请输入新密码" class="updatepassword-popup-main-input" show-password />
        </div>
        <div>
          <span>确认密码:</span>
          <el-input v-model="confirmPassword" placeholder="请再次输入新密码" class="updatepassword-popup-main-input"
            show-password />
        </div>
      </div>
      <div class="updatepassword-popup-footer">
        <button class="updatepassword-popup-footer-cancel" @click="popUpClosed = true">取消</button>
        <button class="updatepassword-popup-footer-confirm" @click="updatePassword">确认</button>
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
const nickName = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const updatePassword = () => {
  popUpClosed.value = true
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/updatePasswordPopUp.less');
</style>
