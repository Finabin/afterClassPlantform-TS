<template>
  <div>
    <MainPagePopUp />
    <LogOutPopUp v-if="logOutPopUpVisible" />
  </div>
  <el-container class="layout-container-demo" style="height: 500px">

    <el-header style="display: flex; justify-content: space-between; align-items: center">
      <span>{{ $t('system.logo') }}</span>
      <div class="toolbar">
        <el-switch v-model="i18nSwitch" @change="changeLanguage" size="large">
          <template #active-action>
            <span class="custom-active-action">CN</span>
          </template>
          <template #inactive-action>
            <span class="custom-inactive-action">EN</span>
          </template>
        </el-switch>
        <el-avatar :size="50" :src="circleUrl" />
        <el-dropdown>
          <span>{{ $t('system.username') }},{{ nickname }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>当前角色：学生</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

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
                <span v-if="i18nSwitch">{{ item.name }}</span>
                <span v-else>{{ item.Ename }}</span>
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
import { useI18n } from "vue-i18n";
import MainPagePopUp from '@/components/MainPagePopUp.vue';
import { useRoute, useRouter } from 'vue-router'
import LogOutPopUp from '@/components/LogOutPopUp.vue';

const { locale } = useI18n();
const router = useRouter()
const route = useRoute()
const curRoute = ref('/main')
const i18nSwitch = ref(true)
const nickname = 'admin'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const logOutPopUpVisible = ref(false)


const changeRoute = (path: string) => {
  curRoute.value = path
}

const changeLanguage = () => {
  localStorage.setItem('locale', i18nSwitch.value ? 'zhCn' : 'en')
  locale.value = i18nSwitch.value ? 'zhCn' : 'en';
}

const logOut = () => {
  logOutPopUpVisible.value = true
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