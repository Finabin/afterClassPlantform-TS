<template>
    <div @click="toCourseDetail(id)" class="mainfilterlistitem-container">
        <div class="mainfilterlistitem-img">
            <img :src=props.courseData.courseImg alt="">
        </div>
        <div class="mainfilterlistitem-courseinfo">
            <div class="mainfilterlistitem-courseinfo-name">{{ props.courseData.courseName }}</div>
            <div class="mainfilterlistitem-courseinfo-intro">课程简介: {{ props.courseData.introduction }}</div>
        </div>
        <div class="mainfilterlistitem-coursesold">
            <div class="mainfilterlistitem-coursesold-price">￥{{ props.courseData.price }}</div>
            <div v-if="props.courseData.courseSold" class="mainfilterlistitem-coursesold-soldcount">已售{{
                props.courseData.sellNum }}套</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    courseData: {
        type: Object,
        required: true
    }
});

const id = ref(props.courseData.id)

const toCourseDetail = (id: number) => {
    console.log(id)
    router.push(`/course/detail/id=${id}`)
}
</script>

<style lang="less" scoped>
@import url('../assets/css/components/mainFilterListItem.css');
</style>