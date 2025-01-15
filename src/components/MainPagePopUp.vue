<template>
  <div class="mainpage-popup">
    <el-dialog v-model="mainpageDialogVisible" title="请选择你的职业" width="500" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false" align-center>
      <div class="mainpage-popup-identity">
        <span @click="chooseIdentity('student')">我是学生</span>
        <span @click="chooseIdentity('teacher')">我是老师</span>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  mainpageDialogVisible: {
    type: Boolean,
  }
})

const identity = ref('')
const mainpageDialogVisible = ref(props.mainpageDialogVisible)

const chooseIdentity = (iden: string) => {
  identity.value = iden
  mainpageDialogVisible.value = false
  emit('mainpageDialogVisible', false)
}

</script>

<style lang="less" scoped>
@import url('../assets/css/components/mainPagePopUp.css');
</style>