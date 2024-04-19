<template>
    <div class="nav">


                <el-anchor class="anchor" direction="horizontal" :offset="64">
                    <el-anchor-link :href="`#roomList`">
                        房型预订
                    </el-anchor-link>
                    <el-anchor-link :href="`#details`">
                        酒店详情
                    </el-anchor-link>
                    <el-anchor-link :href="`#reviewsModule`">
                        顾客点评
                    </el-anchor-link>
                </el-anchor>




    </div>
</template>

<script setup lang="ts">



</script>

<style lang="scss" scoped>
.nav {
    margin-top: 20px;

    .anchor {
        width: 100%;
        height: 50px;

        background-color: $mainColor;


    }

    a,
    .el-anchor__link {
        color: #fff !important;
    }
}
</style>