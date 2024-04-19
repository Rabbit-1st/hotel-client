<template>
    <div class="details">
        <h2>酒店详情</h2>
        <div class="row">
            <span class="title">联系方式</span>
            <span>{{ form.contact }}</span>
        </div>
        <div class="row">
            <span class="title">基本信息</span>
            <span>{{ form.baseInfo }}</span>
        </div>
        <div class="row">
            <span class="title">酒店简介</span>
            <span>{{ form.intro }}</span>
        </div>
        <el-divider border-style="dashed" />
        <div class="row">
            <span class="title">入离时间</span>
            <span>{{ form.edTime }}</span>
        </div>
        <div class="row">
            <span class="title">宠物</span>
            <span>{{ form.pets }}</span>
        </div>
        <div class="row">
            <span class="title">外宾</span>
            <span>{{ form.foreignInfo }}</span>
        </div>
        <div class="row">
            <span class="title">膳食安排</span>
            <span>{{ form.dietary }}</span>
        </div>
        <el-divider border-style="dashed" />
        <div class="row">
            <span class="title">停车服务</span>
            <span>{{ form.parking }}</span>
        </div>
        <div class="row">
            <span class="title">网络设施</span>
            <span>{{ form.network }}</span>
        </div>
        <div class="row">
            <span class="title">前台服务</span>
            <span>{{ form.service }}</span>
        </div>
        <div class="row">
            <span class="title">通电设施</span>
            <span>{{ form.electrification }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { detialsAPI } from '@/apis/main';
import { onMounted, ref } from 'vue';

const form = ref({
    contact: '',
    baseInfo: '',
    intro: '',
    edTime: '',
    pets: '',
    foreignInfo: '',
    dietary: '',
    parking: '',
    network: '',
    service: '',
    electrification: ''
})

const getData = async()=>{
    const res = await detialsAPI()
    if(res.code ===200){
        form.value = res.data
    }
}

onMounted(()=>{
    getData()
})




</script>

<style lang="scss" scoped>
div.details {
    width: 100%;
    padding-top: 24px;

    h2 {
        margin-left: 20px;
    }

    div.row {
        width: 100%;
        margin: 20px 0 0 20px;

        span {
            font-size: 14px;

        }

        span.title {
            font-weight: bold;
            width: 100px;
            display: inline-block;
        }
    }
}
</style>