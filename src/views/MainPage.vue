<template>
  <el-main>
    <div>首页</div>
    <div class="mainpage-search">
      <div class="mainpage-seleArea">
        <div class="mainpage-seleArea-row">
          <div class="mainpage-seleArea-item">
            <span class="mainpage-seleArea-item-title">性别</span>
            <el-select v-model="selectSex" placeholder="请选择教师性别" size="large" style="width: 240px">
              <el-option v-for="item in sexSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-seleArea-item">
            <span class="mainpage-seleArea-item-title">学历</span>
            <el-select v-model="selectEdubg" placeholder="请选择教师学历" size="large" style="width: 240px">
              <el-option v-for="item in edubgSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-seleArea-item">
            <span class="mainpage-seleArea-item-title">学校标签</span>
            <el-select v-model="selectSchool" placeholder="请选择学校标签" size="large" style="width: 240px">
              <el-option v-for="item in schoolSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="mainpage-seleArea-row">
          <div class="mainpage-seleArea-item">
            <span>科目</span>
            <el-select v-model="selectSubject" placeholder="请选择科目" size="large" style="width: 240px">
              <el-option v-for="item in subjectSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-seleArea-item">
            <span>地区</span>
            <el-select v-model="selectArea" placeholder="请选择所在地区" size="large" style="width: 240px">
              <el-option v-for="item in areaSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="mainpage-seleArea-item">
            <span>教师星级</span>
            <el-select v-model="selectStar" placeholder="请选择教师星级" size="large" style="width: 240px">
              <el-option v-for="item in starSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="mainpage-seleArea-row">
          <div class="mainpage-seleArea-item">
            <span>教龄</span>
            <el-select v-model="selectTecAge" placeholder="请选择教师教龄" size="large" style="width: 240px">
              <el-option v-for="item in tecAgeSelection" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div>
            <span>关键词</span>
            <el-input v-model="searchInput" style="width: 30vw" placeholder="请输入教师ID、姓名" size="large" />
            <el-button type="primary" size="large">
              <el-icon>
                <Search />
              </el-icon>
              {{ $t('mainPage.search') }}
            </el-button>
            <el-button size="large">
              <el-icon>
                <Refresh />
              </el-icon>
              {{ $t('mainPage.reset') }}
            </el-button>
          </div>
        </div>
      </div>
      <div>
        星级榜
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="sex" label="性别" width="180" />
          <el-table-column prop="star" label="星级">
            <template v-slot:default="scope">
              <el-rate v-model="scope.row.star" disabled text-color="#ff9900" score-template="{value}" />
            </template>
          </el-table-column>
          <el-table-column prop="school" label="高校">
            <template v-slot:default="scope">
              <span>{{ scope.row.school }}</span>
              <span v-if="scope.row.rank === '985'">{{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank === '211'">{{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank === '双一流'">{{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank === 'QS前50'">{{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank === 'QS前100'">{{ scope.row.rank }}</span>
              <span v-else>{{ scope.row.rank }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="subject" label="专业" />
          <el-table-column prop="edubg" label="学历" />
        </el-table>
      </div>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainFilterListItem from '@/components/MainFilterListItem.vue'
import homeData from '@/static/homeData.ts'

const {
  sexSelection,
  edubgSelection,
  schoolSelection,
  starSelection,
  subjectSelection,
  tecAgeSelection,
  tableData
} = homeData

const selectSex = ref('')
const selectEdubg = ref('')
const selectSchool = ref('')
const selectStar = ref('')
const selectSubject = ref('')
const selectArea = ref('')
const selectTecAge = ref('')
const searchInput = ref('')
</script>

<style scoped>
@import url('../assets/css/mainpage.less');
</style>