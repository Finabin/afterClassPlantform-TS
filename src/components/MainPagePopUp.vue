<template>
  <div class="mainpage-popup">
    <el-dialog v-model="mainpageDialogVisible" title="请选择你的职业" width="500" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false" align-center>
      <div class="mainpage-popup-identity">
        <span @click="chooseIdentity(1)">我是学生</span>
        <span @click="chooseIdentity(2)">我是老师</span>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { identifyAPI } from '../apis/login'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus'

const props = defineProps({
  mainpageDialogVisible: {
    type: Boolean,
  }
})
const userInfoStore = useUserInfoStore();
const { id } = storeToRefs(userInfoStore);
const mainpageDialogVisible = ref(props.mainpageDialogVisible)

const chooseIdentity = async (iden: number) => {
  const data = {
    id: Number(id.value),
    role: iden
  }
  const res = await identifyAPI(data)
  if (res.code === 1) {
    ElMessage({
      message: '身份选择成功',
      type: 'success',
    })
    mainpageDialogVisible.value = false
    emit('mainpageDialogVisible', false)
  } else {
    ElMessage({
      message: '身份选择失败',
      type: 'error',
    })
  }
}

</script>

<style lang="less" scoped>
@import url('../assets/css/components/mainPagePopUp.css');
</style>