<template>
  <el-dialog v-model="withdrawalDialogVisible" title="提现" width="500" align-center>
    <div class="incomepage-dialog-row">
      <span class="incomepage-dialog-span-require">*</span>
      <span class="incomepage-dialog-span-text">提现方式：</span>
      <el-radio-group v-model="withdrawal.status">
        <el-radio value="微信">微信</el-radio>
        <el-radio value="支付宝">支付宝</el-radio>
      </el-radio-group>
    </div>
    <div class="incomepage-dialog-row">
      <span class="incomepage-dialog-span-require">*</span>
      <span class="incomepage-dialog-span-text">提现金额：</span>
      <el-input v-model="withdrawal.takeMoney" style="width: 150px; height: 38px;" />
      <span class="incomepage-dialog-span-symbol">元</span>
    </div>
    <template #footer>
      <div class="incomepage-dialog-footer">
        <el-button @click="emitEvent">取消</el-button>
        <el-button type="primary" @click="toWithdrwawal">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";
import { withdrawalAPI } from '@/apis/income'
import { ElMessage } from 'element-plus'

const userInfoStore = useUserInfoStore();
const { id } = storeToRefs(userInfoStore);
const props = defineProps({
  IncomeDialogVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['custom-event']);

function emitEvent() {
  emit('custom-event', false);
}

const withdrawalDialogVisible = ref(props.IncomeDialogVisible)
const withdrawal = ref({
  status: '',
  takeMoney: '',
})

const toWithdrwawal = async () => {
  const data = {
    teacherId: Number(id.value),
    mode: withdrawal.value.status,
    money: withdrawal.value.takeMoney,
  }
  const res = await withdrawalAPI(data)
  if (res.code === 1) {
    ElMessage({
      message: '提现成功',
      type: 'success',
    })
    emitEvent()
  } else {
    ElMessage({
      message: '提现失败',
      type: 'error',
    })
  }
  emit('custom-event', false);
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/incomeDialog.css');
</style>
