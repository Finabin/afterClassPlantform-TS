<template>
    <div>
        <img src="" alt="">
    </div>
    <div>Something Went Wrong</div>
    <div>
        <span>{{ time }}秒后将跳转回上一个页面</span>
        <span @click="goBackRightnow()">点此立即返回</span>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let time = ref(5)
let timer:any

onMounted(() => {
    timer = setInterval(() => {
        time.value--
        if (time.value === 0) {
            clearInterval(timer)
            router.go(-1)
        }
    }, 1000)
})

const goBackRightnow = () => {
    timer = clearInterval(timer)
    router.go(-1)
}

</script>

<style scoped></style>