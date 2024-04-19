<template>
    <div class="box">
        <div class="left">
            <el-image class="mainImage" v-if="imageList.length > 0" :src="mainImage.url" :preview-src-list="srcList"
                hide-on-click-modal :initial-index="initialIndex"></el-image>
        </div>
        <div class="right">
            <el-image class="imgItem" v-for="(item, index) in imageList" :index="index" :src="item.url"
                @click="handleImageChange(item, index)"></el-image>

        </div>
    </div>
</template>

<script setup lang="ts">
import { imageListAPI, image } from '@/apis/banner.ts'
import { onMounted, ref } from 'vue';

const imageList = ref<image[]>([])
const mainImage = ref<image>({} as image)
const srcList = ref<string[]>([])
const initialIndex = ref(0)

const getDate = async () => {
    const res = await imageListAPI()
    if (res.code === 200) {
        imageList.value = res.data
        mainImage.value = res.data[0]
        imageList.value.forEach((item: image) => {
            srcList.value.push(item.url)
        })
    }

}

//改变主显示
const handleImageChange = (item: image, index: number) => {
    mainImage.value = item
    initialIndex.value = index
}

onMounted(() => {
    getDate()
})

</script>

<style lang="scss" scoped>
div.box {
    width: 100%;
    display: flex;
    max-height: 612px;

    div.left {
        flex: 1;
        max-height: 612px;

        .mainImage {
            border-radius: 8px;
            object-fit: contain;
            max-height: 612px;
        }
    }

    div.right {
        padding: 2px;
        width: 312px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        overflow-y: scroll;

        .imgItem {
            width: 150px;
            height: 150px;
            background-color: #eee;
            margin-right: 2px;
            margin-bottom: 2px;
            border-radius: 8px;
            cursor: pointer;
        }
    }
}</style>