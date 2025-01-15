<template>
  <div class="logout-popup">
    <el-dialog v-model="popUpClosed" title="退出登录" width="500" align-center>
      <div class="logout-popup-content">
        <span>确认退出登录？</span>
      </div>
      <template #footer>
        <div class="logout-popup-footer">
          <el-button @click="emitEvent">取消</el-button>
          <el-button type="primary" @click="logOut">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Close } from '@element-plus/icons-vue'

const router = useRouter();

const props = defineProps({
  popUpClosed: {
    type: Boolean,
    required: true
  }
});

const popUpClosed = ref(props.popUpClosed);
const emit = defineEmits(['custom-event']);

function emitEvent() {
  popUpClosed.value = false;
  emit('custom-event', false);
}

const logOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
  popUpClosed.value = false;
  emit('custom-event', false);
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/logOutPopUp.css');
</style>
