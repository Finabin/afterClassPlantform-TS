<template>
  <e-charts class="chart" :option="option" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getOrdersGraphDataAPI } from '@/apis/data'

const data = ref([])

onMounted(async () => {
  const res = await getOrdersGraphDataAPI()
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
</script>

<style>
.chart {
  height: 400px;
}
</style>