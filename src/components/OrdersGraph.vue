<template>
  <e-charts class="chart" :option="option" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getOrdersGraphDataAPI, getTeacherOrdersGraphDataAPI } from '@/apis/data'
import useUserInfoStore from '@/stores/user'
import { storeToRefs } from "pinia";

const userInfoStore = useUserInfoStore();
const { id, role } = storeToRefs(userInfoStore);
const data = ref([])
const X = ref(['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'])

const handleX = (data) => {
  const date = new Date()
  const month = date.getMonth() + 1
  console.log(month);
  if (month === 12) {
    return data
  }
  const result = []
  const temp = data.slice(12 - month + 1)
  result.push(...temp)
  result.push(...data.slice(0, 12 - month + 1))
  console.log(result);

  return result
}

onMounted(async () => {
  X.value = handleX(X.value)
  let res
  if (role.value === '2') {
    const data = {
      id: id.value
    }
    res = await getTeacherOrdersGraphDataAPI(data)
  } else {
    res = await getOrdersGraphDataAPI()
  }
  data.value = res.data
})

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: X.value
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: data.value
      }
    ]
  }
})
</script>

<style>
.chart {
  height: 400px;
}
</style>