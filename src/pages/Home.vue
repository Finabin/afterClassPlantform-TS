<template>
  <div>
    <MainPagePopUp :mainpageDialogVisible="mainpageDialogVisible" v-if="mainpageDialogVisible" />
    <LogOutPopUp v-if="logOutPopUpVisible" :popUpClosed="logOutPopUpVisible"
      @custom-event="handleLogOutVisibleChange" />
    <UpdatePasswordPopUp v-if="updatePasswordPopUpVisible" :popUpClosed="updatePasswordPopUpVisible"
      @custom-event="handleUpdatePwdVisibleChange" />
  </div>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-header style="display: flex; justify-content: space-between; align-items: center">
      <span>{{ $t('system.logo') }}</span>
      <div class="toolbar">
        <!-- <el-switch v-model="i18nSwitch" @change="changeLanguage" size="large">
          <template #active-action>
            <span class="custom-active-action">CN</span>
          </template>

<template #inactive-action>
            <span class="custom-inactive-action">EN</span>
          </template>
</el-switch> -->
        <el-avatar :size="50" :src="avatar" class="homepage-avatar" />
        <el-dropdown>
          <span class="homepage-nickname">{{ $t('system.username') }},{{ nickName }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled="true">当前角色：
                <span v-if="role === '1'">学生</span>
                <span v-else-if="role === '2'">老师</span>
                <span v-else>管理员</span>
              </el-dropdown-item>
              <el-dropdown-item @click="updatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: #fff;">
        <el-scrollbar>
          <el-menu :router="true" :default-active="curRoute">
            <template v-for="(item, index) in roleMenu" :key="index">
              <!-- 如果有子菜单，则使用el-sub-menu -->
              <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path || ''">
                <template #title>
                  <el-icon>
                    <component :is="item.icon" />
                  </el-icon>
                  <span v-if="i18nSwitch">{{ item.name }}</span>
                  <span v-else>{{ item.Ename }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path"
                  @click="changeRoute(child.path)">
                  <el-icon>
                    <component :is="child.icon" />
                  </el-icon>
                  <span v-if="i18nSwitch">{{ child.name }}</span>
                  <span v-else>{{ child.Ename }}</span>
                </el-menu-item>
              </el-sub-menu>

              <!-- 如果没有子菜单，则使用el-menu-item -->
              <el-menu-item v-else :index="item.path" @click="changeRoute(item.path)">
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
                <span v-if="i18nSwitch">{{ item.name }}</span>
                <span v-else>{{ item.Ename }}</span>
              </el-menu-item>
            </template>
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
import { ref, onMounted } from 'vue'
import menu from '@/router/menu'
import { useI18n } from "vue-i18n";
import MainPagePopUp from '@/components/MainPagePopUp.vue';
import LogOutPopUp from '@/components/LogOutPopUp.vue';
import UpdatePasswordPopUp from '@/components/UpdatePasswordPopUp.vue';
import useUserInfoStore from '@/stores/user'
import useMenuIndexStore from '@/stores/menu';
import { storeToRefs } from "pinia";

const userInfoStore = useUserInfoStore();
const menuIndexStore = useMenuIndexStore();
const { nickName, role, avatar } = storeToRefs(userInfoStore);
const { curMenuIndex } = storeToRefs(menuIndexStore);
const { locale } = useI18n();
const curRoute = ref(curMenuIndex)
const i18nSwitch = ref(true)
const logOutPopUpVisible = ref(false)
const updatePasswordPopUpVisible = ref(false)
const mainpageDialogVisible = ref(true)
const roleMenu = ref()

function filterMenuByRole(menu: any, role: string) {
  return menu.filter((item: any) => {
    if (item.auth.includes(role)) {
      if (item.children && item.children.length > 0) {
        item.children = filterMenuByRole(item.children, role);
      }
      return true;
    }
    return false;
  });
}

onMounted(async () => {
  roleMenu.value = filterMenuByRole(menu, role.value);
  if (role.value) {
    mainpageDialogVisible.value = false
  }
})


const changeRoute = (path: string) => {
  curRoute.value = path
  curMenuIndex.value = path
}

const changeLanguage = () => {
  localStorage.setItem('locale', i18nSwitch.value ? 'zhCn' : 'en')
  locale.value = i18nSwitch.value ? 'zhCn' : 'en';
}

const updatePassword = () => {
  updatePasswordPopUpVisible.value = true
}

const logOut = () => {
  logOutPopUpVisible.value = true
}

const handleLogOutVisibleChange = (visible: boolean) => {
  logOutPopUpVisible.value = visible
}

const handleUpdatePwdVisibleChange = (visible: boolean) => {
  updatePasswordPopUpVisible.value = visible
}


</script>

<style lang="less" scoped>
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


.homepage-avatar {
  margin: 0 1vw;
}

.homepage-nickname {
  font-size: 1.2em;
}

.el-menu .el-menu-item {
  &:hover {
    background-color: #f5f5f5 !important;
    color: #409eff !important;
  }

  &.is-active {
    background-color: #f5f5f5 !important;
    color: #409eff !important;
  }
}
</style>