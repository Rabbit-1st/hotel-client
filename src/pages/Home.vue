<template>
    <nav-hander></nav-hander>
    <div class="main">
        <h2>xx青年酒店<span>经济型</span></h2>
        <p>浦东区xx大街xx弄415号</p>
        <Banner />

        <navigation></navigation>

        <room-list id="roomList"></room-list>
        <details-module id="details"></details-module>
        <comment-module></comment-module>

    </div>

    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.main {

    margin: 74px auto;
    border-radius: 5px;
    padding-top: 18px;
    width: 1200px;
    background-color: #fff;

    h2 {
        margin-left: 20px;

        span {
            font-size: 12px;
            color: #aaa;
            margin-left: 10px;
        }
    }

    p {
        color: #666;
        font-size: 14px;
        margin-left: 20px;
        margin-bottom: 10px;
    }
}
</style>