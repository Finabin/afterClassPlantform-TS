<template>
  <div class="updatepwd-popup">
    <el-dialog v-model="popUpClosed" title="修改密码" width="500" align-center>
      <div class="updatepwd-popup-content">
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-title">账号：</span>
          </div>
          <el-input v-model="nickName" style="width: 240px" disabled />
        </div>
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-require">*</span>
            <span class="updatepwd-popup-content-single-title">新密码：</span>
          </div>
          <el-input v-model="newPassword" style="width: 240px" type="password" placeholder="这是新密码" show-password />
        </div>
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-require">*</span>
            <span class="updatepwd-popup-content-single-title">确认密码：</span>
          </div>
          <el-input v-model="confirmPassword" style="width: 240px" type="password" placeholder="这是确认密码" show-password />
        </div>
      </div>
      <template #footer>
        <div class="updatepwd-popup-footer">
          <el-button @click="emitEvent">取消</el-button>
          <el-button type="primary" @click="updatePassword">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  popUpClosed: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['custom-event']);

const popUpClosed = ref(props.popUpClosed);
const nickName = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

function emitEvent() {
  popUpClosed.value = false;
  emit('custom-event', false);
}

const updatePassword = () => {
  popUpClosed.value = false
  emit('custom-event', false);
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/updatePwdPopUp.css');
</style>
