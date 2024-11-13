<template>
  <el-container class="layout-container-demo" style="height: 500px">

    <el-header style="display: flex; justify-content: space-between; align-items: center">
      <span>{{ $t('system.logo') }}</span>
      <div class="toolbar">
        <el-switch v-model="i18nSwitch" @change="changeLanguage">
          <template #active-action>
            <span class="custom-active-action">CN</span>
          </template>
          <template #inactive-action>
            <span class="custom-inactive-action">EN</span>
          </template>
        </el-switch>
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :router="true" :default-active="curRoute">
            <div v-for="(item, index) in menu" :key="index">
              <el-menu-item :index="item.path" @click="changeRoute(item.path)">
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import menu from '@/router/menu'
// import { useI18n } from 'vue-i18n'

const curRoute = ref('/main')
const i18nSwitch = ref(true)

const changeRoute = (path: string) => {
  curRoute.value = path
}

const changeLanguage = () => {
  localStorage.setItem('locale', i18nSwitch.value ? 'cn' : 'en')
}

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  text-align: right;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>