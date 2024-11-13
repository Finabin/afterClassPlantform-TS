<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small',
    }
  },
})
</script>

<template>
  <el-config-provider size="small" :z-index="zIndex">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <app /> -->
  </el-config-provider>
</template>

<style scoped>

</style>
