<template>
    <div id="reviewsModule">
        <el-divider />
        <div class="row">
            <h2><span class="title">顾客评价</span></h2>
            <div><el-button @click="addHandle" type="primary">我要评价</el-button></div>
        </div>

        <el-form-item class="classify">
            <el-radio-group v-model="page.rating" @change="handleChange">
                <el-radio :value="0">全部</el-radio>
                <el-radio :value="1">差评</el-radio>
                <el-radio :value="3">中评</el-radio>
                <el-radio :value="5">好评</el-radio>
            </el-radio-group>
        </el-form-item>

        <div>
            <reviews-box v-for="(item, index) in list" :index="index" :reviews="item"></reviews-box>
        </div>

        <div class="pagination">
            <el-pagination background :page-size="page.size" layout="prev, pager, next,jumper,total" :total="page.total"
                @current-change="pageChangeHandle" />
        </div>

    </div>

    <AddDialog v-model:dialogVisible="addDialogVisible" @getData="getData"></AddDialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { reviewsListForm, reviews, reviewsListAPI } from '@/apis/reviews'
import AddDialog from './AddDialog.vue'
import { useUserStore } from '@/stores/user'
import router from '@/routers'
import { ElMessage } from 'element-plus';

const userStore = useUserStore()


interface addTotal {
    total: number
}

const page: reviewsListForm & addTotal = reactive({
    current: 1,
    size: 10,
    order: 'descending',
    prop: 'createTime',
    total: 0,
    rating: 0//0查询全部
})


const list = ref<reviews[]>([])


const getListData = async () => {
    const current = page.current
    const size = page.size
    const order = page.order
    const prop = page.prop
    const rating = page.rating
    const res = await reviewsListAPI({ current, size, order, prop, rating })
    if (res.code === 200) {
        list.value = res.data.records
        page.size = res.data.size
        page.total = res.data.total

    }
}


//翻页
const pageChangeHandle = (current: number) => {
    page.current = current
    getListData()

}

//筛选
const handleChange = ()=>{
    getListData()
}

onMounted(() => {
    getListData()
})


const addDialogVisible = ref(false)

const addHandle = () => {
    if (null == userStore.userInfo.id) {
        router.push('/login')
        ElMessage.warning({
            message: '请先登录'
        })
        return
    }
    addDialogVisible.value = true
}


const getData = async () => {
    getListData()
}

</script>

<style lang="scss" scoped>
.row {

    display: flex;
    justify-content: space-between;

    h2 {
        padding: 20px 20px 0 20px;

        span.title {
            position: relative;
            font-size: 24px;
            font-weight: bold;
            


            &::after {
                content: '';
                position: absolute;
                z-index: 0;
                top: 75%;
                right: -0.1em;
                left: -0.1em;
                bottom: 0;
                background-color: $mainColor;
                transition: .3s;
                opacity: .4;
            }

            &:hover {
                &::after {
                    top: 0;

                }
            }
        }


    }

    button {
        margin: 20px 20px;
        color: #fff;
    }

}

.classify{
    margin-left: 20px;
}



.pagination {
    width: 100%;
    padding: 16px 0;
    display: flex;
    justify-content: center;
}
</style>