<template>
  <el-dialog v-model="withdrawalDialogVisible" title="提现" width="500" align-center>
    <div class="incomepage-dialog-row">
      <span class="incomepage-dialog-span-require">*</span>
      <span class="incomepage-dialog-span-text">提现方式：</span>
      <el-radio-group v-model="withdrawal.status">
        <el-radio value="1">微信</el-radio>
        <el-radio value="0">支付宝</el-radio>
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

const toWithdrwawal = () => {
  emit('custom-event', false);
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/incomeDialog.css');
</style>
