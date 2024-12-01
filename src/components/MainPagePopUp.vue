<template>
  <div class="overlay" v-if="chooseFinish === false">
    <div class="mainpagepopup-container-1" v-if="identity === ''">
      <div class="mainpagepopup-title">
        请选择您的职业
      </div>
      <div class="mainpagepopup-selectArea">
        <button class="mainpagepopup-button" @click="chooseIdentity('student')">我是学生</button>
        <button class="mainpagepopup-button" @click="chooseIdentity('teacher')">我是教师</button>
      </div>
    </div>

    <div class="mainpagepopup-container-2" v-if="identity !== ''">
      <div class="mainpagepopup-title">
        请选择您的年级
      </div>
      <div class="mainpagepopup-selectArea">
        <div class="mainpagepopup-selePart">
          <div class="mainpagepopup-seleTitle">小学</div>
          <div class="mainpagepopup-selectRow">
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('11') }"
              @click="chooseGrade('11')">一年级</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('12') }"
              @click="chooseGrade('12')">二年级</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('13') }"
              @click="chooseGrade('13')">三年级</button>
          </div>
          <div class="mainpagepopup-selectRow">
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('14') }"
              @click="chooseGrade('14')">四年级</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('15') }"
              @click="chooseGrade('15')">五年级</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('16') }"
              @click="chooseGrade('16')">六年级</button>
          </div>
        </div>
        <div class="mainpagepopup-selePart">
          <div class="mainpagepopup-seleTitle">初中</div>
          <div class="mainpagepopup-selectRow">
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('21') }"
              @click="chooseGrade('21')">初一</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('22') }"
              @click="chooseGrade('22')">初二</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('23') }"
              @click="chooseGrade('23')">初三</button>
          </div>
        </div>
        <div class="mainpagepopup-selePart">
          <div class="mainpagepopup-seleTitle">高中</div>
          <div class="mainpagepopup-selectRow">
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('31') }"
              @click="chooseGrade('31')">高一</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('32') }"
              @click="chooseGrade('32')">高二</button>
            <button class="mainpagepopup-button" :class="{ 'mainpagepopup-button-selected': grade.includes('33') }"
              @click="chooseGrade('33')">高三</button>
          </div>
        </div>
      </div>
      <div class="mainpagepopup-confirmButton">
        <button @click="confirm" :class="{ 'clickable': isChoose, 'not-clickable': !isChoose }">确认</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

const identity = ref('')
const grade: string[] = reactive([])
const chooseFinish = ref(false)

const chooseIdentity = (iden: string) => {
  identity.value = iden
}

const chooseGrade = (gra: string) => {
  if (identity.value === 'student') {
    if (grade.length !== 0) {
      grade.pop()
    }
    grade.push(gra)
  } else {
    if (grade.indexOf(gra) === -1) {
      grade.push(gra)
    } else {
      grade.splice(grade.indexOf(gra), 1)
    }
  }
}

const confirm = () => {
  console.log(identity.value)
  console.log(grade)
  if (grade.length > 0 && identity.value !== '') {
    chooseFinish.value = true
  }
}

const isChoose = computed(() => {
  return (grade.length > 0 && identity.value !== '') ? true : false
})
</script>

<style lang="less" scoped>
@import url('../assets/css/components/mainPagePopUp.less');
</style>