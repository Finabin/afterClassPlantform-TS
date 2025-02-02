<template>
  <div class="updatepwd-popup">
    <el-dialog v-model="popUpClosed" title="修改密码" width="500" align-center>
      <div class="updatepwd-popup-content">
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-title">账号：</span>
          </div>
          <el-input v-model="nickName" style="width: 240px; height: 38px;" disabled />
        </div>
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-require">*</span>
            <span class="updatepwd-popup-content-single-title">新密码：</span>
          </div>
          <el-input v-model="newPassword" style="width: 240px; height: 38px;" type="password" placeholder="这是新密码"
            show-password />
        </div>
        <div class="updatepwd-popup-content-single">
          <div class="updatepwd-popup-content-single-label">
            <span class="updatepwd-popup-content-single-require">*</span>
            <span class="updatepwd-popup-content-single-title">确认密码：</span>
          </div>
          <el-input v-model="confirmPassword" style="width: 240px; height: 38px;" type="password" placeholder="这是确认密码"
            show-password />
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
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";
import { updatePwdAPI } from '@/apis/main'
import { ElMessage } from 'element-plus'

const userInfoStore = useUserInfoStore();
const { id, nickName } = storeToRefs(userInfoStore);
const props = defineProps({
  popUpClosed: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['custom-event']);

const popUpClosed = ref(props.popUpClosed);
const newPassword = ref('');
const confirmPassword = ref('');

function emitEvent() {
  popUpClosed.value = false;
  emit('custom-event', false);
}

const checkValid = () => {
  if (newPassword.value === '' || confirmPassword.value === '') {
    ElMessage({
      message: '密码不能为空',
      type: 'error'
    })
    return false;
  }
  if (newPassword.value !== confirmPassword.value) {
    ElMessage({
      message: '两次密码不一致',
      type: 'error'
    })
    return false;
  }
  return true;
}

const updatePassword = async () => {
  if (!checkValid()) return;
  const data = {
    id: Number(id.value),
    password: newPassword.value,
  }
  const res = await updatePwdAPI(data);
  if (res.code === 1) {
    ElMessage({
      message: '修改密码成功',
      type: 'success'
    })
    popUpClosed.value = false
    emit('custom-event', false);
  } else {
    ElMessage({
      message: '修改密码失败',
      type: 'error'
    })
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/updatePwdPopUp.css');
</style>
