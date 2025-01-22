<template>
  <el-main class="datapage-view">
    <div class="datapage-header">
      数据看板
    </div>
    <div class="datapage-main">
      <div class="datapage-main-top">
        <div class="datapage-main-top-single">
          <div class="datapage-main-top-single-left">
            <div class="datapage-main-top-single-left-title">
              今日订单数
            </div>
            <div class="datapage-main-top-single-left-data">
              {{ dataInfo.ordersToday }}
            </div>
          </div>
          <div class="datapage-main-top-single-right">
            <img src="" alt="">
          </div>
        </div>
        <div class="datapage-main-top-single">
          <div class="datapage-main-top-single-left">
            <div class="datapage-main-top-single-left-title">
              今日销售额
            </div>
            <div class="datapage-main-top-single-left-data">
              ￥{{ dataInfo.salesToday }}
            </div>
          </div>
          <div class="datapage-main-top-single-right">
            <img src="" alt="">
          </div>
        </div>
        <div class="datapage-main-top-single">
          <div class="datapage-main-top-single-left">
            <div class="datapage-main-top-single-left-title">
              昨日销售额
            </div>
            <div class="datapage-main-top-single-left-data">
              ￥{{ dataInfo.salesYes }}
            </div>
          </div>
          <div class="datapage-main-top-single-right">
            <img src="" alt="">
          </div>
        </div>
        <div class="datapage-main-top-single">
          <div class="datapage-main-top-single-left">
            <div class="datapage-main-top-single-left-title">
              近七日销售额
            </div>
            <div class="datapage-main-top-single-left-data">
              ￥{{ dataInfo.salesWeek }}
            </div>
          </div>
          <div class="datapage-main-top-single-right">
            <img src="" alt="">
          </div>
        </div>
      </div>
      <div class="datapage-main-middle">
        <div class="datapage-main-middle-single">
          <div class="datapage-main-middle-single-label">课程总览</div>
          <div class="datapage-main-middle-single-content">
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.courseData.courseAll }}
              </div>
              <div class="datapage-main-middle-single-content-single-title">已上架</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.courseData.courseOn }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">已下架</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.courseData.courseDown }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">已结课</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.courseData.courseOver }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">全部课程</div>
            </div>
          </div>
        </div>
        <div class="datapage-main-middle-single">
          <div class="datapage-main-middle-single-label">用户总览</div>
          <div class="datapage-main-middle-single-content">
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.userData.userAll }}
              </div>
              <div class="datapage-main-middle-single-content-single-title">今日新增</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.userData.newUserToday }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">昨日新增</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.userData.newUserYesterday }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">本月新增</div>
            </div>
            <div class="datapage-main-middle-single-content-single">
              <div class="datapage-main-middle-single-content-single-data">
                {{ dataInfo.userData.newUserMonth }}
              </div>
              <div class="datapage-main-middle-single-content-single-data-title">全部用户</div>
            </div>
          </div>
        </div>
      </div>
      <div class="datapage-main-map">
        <div class="datapage-main-map-label">
          订单统计
        </div>
        <div class="datapage-main-map-data">
          <img src="" alt="">
        </div>
      </div>
      <div class="datapage-main-map">
        <div class="datapage-main-map-label">
          销售统计
        </div>
        <div class="datapage-main-map-data">
          <img src="" alt="">
        </div>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getDataPageInfoAPI } from '../apis/data'

interface DataInfo {
  ordersToday: number, //今日订单数
  salesToday: number, //今日销售额
  salesYes: number, //昨日销售额
  salesWeek: number, //近七日销售额
  //课程总览
  courseData: {
    courseOn: number, //已上架课程
    courseDown: number, //已下架课程
    courseAll: number, //全部课程
    courseOver: number //已结课课程
  },
  //用户总览
  userData: {
    newUserToday: number, //今日新增
    newUserMonth: number, //本月新增
    userAll: number, //全部用户
    newUserYesterday: number //昨日新增
  }
}

const dataInfo = ref<DataInfo>({})

onMounted(async () => {
  const res = await getDataPageInfoAPI()
  dataInfo.value = res.data
})
</script>

<style scoped>
@import url('../assets/css/views/dataPage.css');
</style>