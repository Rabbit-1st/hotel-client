<template>
    <el-dialog v-model="props.dialogVisible" title="添加评论" :before-close="handleClose">

        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="评分">
                <el-rate v-model="form.rating" :texts="ratingText" show-text  text-color="#ff9900" /><span class="tips">给酒店打个分吧！</span>
            </el-form-item>
            <el-form-item label="评论">
                <el-input v-model="form.reviewText" style="width: 350px" :rows="5" type="textarea" placeholder="给酒店评价" />
            </el-form-item>
        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('update:dialogVisible', false)">取消</el-button>
                <el-button type="primary" @click="add">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { reviewsAddAPI } from '@/apis/reviews'
import { ElMessage } from 'element-plus'
import type { reviewsAddForm } from '@/apis/reviews'
import { useUserStore } from '@/stores/user'
import router from '@/routers'

const userStore = useUserStore()
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:dialogVisible', 'getData'])

const handleClose = () => {
    emit('update:dialogVisible', false)
}


const form = reactive<reviewsAddForm>({
    userId: '',
    rating: 0,
    reviewText: '',
    createDate: {}
})



watchEffect(() => {
    if (props.dialogVisible) {
        form.userId = ''
        form.rating = 0
        form.reviewText = ''
        form.createDate = {}

    }

})

const ratingText = ['差评', '差评', '中评', '好评', '好评']

const add = async () => {
    if(form.rating<=0){
        ElMessage.warning({
            message: '评分不能为空哦！'
        }) 
        return
    }
    const userId = userStore.userInfo.id
    const rating = form.rating
    const reviewText = form.reviewText
    const createDate = new Date()

    const res = await reviewsAddAPI({
        userId, rating, reviewText, createDate
    })
    if (res.code == 200) {
        ElMessage.success({
            message: res.msg
        })
        emit('getData')
        handleClose()

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }
}

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

button {
    padding: 0 12px;
}

.el-form-item {
    padding: 12px 0;
}

.tips {
    font-size: 12px;
    color: #aaa;
    margin-left: 12px;
}

</style>