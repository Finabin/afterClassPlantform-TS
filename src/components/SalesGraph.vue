<template>
  <e-charts class="chart" :option="option" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getSalesGraphDataAPI } from '@/apis/data'

const data = ref([])

onMounted(async () => {
  const res = await getSalesGraphDataAPI()
  data.value = res.data
})

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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

// 定时更新数据 每一秒更新一次数据
// setInterval(() => {
//   data.value = data.value.map(item => ({
//     ...item,
//     value: Math.random() * 100,  
//   }))
// }, 1000) 
</script>

<style>
.chart {
  height: 400px;
}
</style>