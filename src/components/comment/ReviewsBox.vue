<template>
    <div>
        <el-divider border-style="dashed" />
        <div class="container">
            <div class="user-info">
                <div class="avatar"><el-icon class="icon" :size="25" color="#666">
                        <Avatar />
                    </el-icon></div>
                <div class="username">{{ props.reviews.lastname + props.reviews.firstname }}</div>
            </div>
            <div class="content">
                <div class="rate"><el-rate v-model="props.reviews.rating" disabled :texts="ratingText" show-text  text-color="#ff9900"
                        score-template="{value} points" /></div>
                <div class="text">{{ props.reviews.reviewText }}</div>
                <div class="created-at">{{ props.reviews.createTime }}</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">



const props = defineProps({
    reviews: {
        type: Object,
        required: true
    }
})

const ratingText = ['差评', '差评', '中评', '好评', '好评']
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: flex-start;
    padding: 20px;

    .user-info {
        flex: 0 0 auto;
        min-width: 140px;
        margin-right: 50px;

        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #eee; // 用户头像的默认背景色
            margin: 0 auto;

            .icon {
                width: 50px;
                height: 50px;
            }
        }

        .username {
            margin-top: 10px;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            color:$mainColor;
        }
    }

    .content {
        flex: 1 1 auto;

        .text {
            margin-bottom: 10px;
        }

        .created-at {
            font-size: 12px;
            color: #888;
        }
    }
}
</style>