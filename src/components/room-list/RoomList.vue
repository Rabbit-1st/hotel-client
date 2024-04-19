<template>
    <div class="wrap">
        <h2>房型预订</h2>
        <div class="controller">
            <el-date-picker v-model="timeZone" type="daterange" range-separator="To" start-placeholder="入住日期"
                end-placeholder="退房日期" :disabled-date="disabledDate" />
            <el-form class="screen" :model="page" label-width="auto" style="max-width: 600px">
                <el-form-item label="床型">
                    <el-radio-group v-model="page.bedType" @change="handleSelect">
                        <el-radio :value="0">大床</el-radio>
                        <el-radio :value="1">双人床</el-radio>
                        <el-radio :value="2">单人床</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="餐食">
                    <el-radio-group v-model="page.breakfast" @change="handleSelect">
                        <el-radio :value="0">无</el-radio>
                        <el-radio :value="1">有</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="政策">
                    <el-radio-group v-model="page.policy" @change="handleSelect">
                        <el-radio :value="0">免费退订</el-radio>
                        <el-radio :value="1">不可退订</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="WiFi">
                    <el-radio-group v-model="page.wifi" @change="handleSelect">
                        <el-radio :value="0">无</el-radio>
                        <el-radio :value="1">有</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="roomList" style="width: 100%" @sort-change="changeHandle">
            <el-table-column prop="image" label="房型">
                <template #default="scope">
                    <el-image v-if="scope.row.images[0]" style="width: 100px; height: 70px" :src="scope.row.images[0].url" fit="contain" 
                    :preview-src-list="scope.row.images.map((item:image)=>item.url)" hide-on-click-modal :z-index="100"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="bedTypeText" label="床型" />
            <el-table-column prop="breakfastText" label="餐食" />
            <el-table-column prop="wifiText" label="WiFi" />
            <el-table-column prop="people" label="入住人数">
                <template #default="scope">
                    <el-icon v-for="item in scope.row.people" :index="item">
                        <UserFilled />
                    </el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="policyText" label="政策" />
            <el-table-column prop="price" label="房价">
                <template #default="scope">
                    <span class="symbol">￥</span><span class="price">{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="book">
                <template #default="scope">
                    <el-button class="book" type="primary" round bg @click="book(scope.row)">预定</el-button>
                </template>
            </el-table-column>


        </el-table>
        <div class="pagination">
            <el-pagination background :page-size="page.size" layout="prev, pager, next,jumper,total" :total="page.total"
                @current-change="pageChangeHandle" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'
import { image, room, roomListAPI } from '@/apis/room'
import router from '@/routers';

interface addTotal {
    total: number
}

const page: any & addTotal = reactive({
    current: 1,
    size: 10,
    order: 'descending',
    prop: 'number',
    total: 0,
    bedType: -1,
    breakfast: -1,
    policy: -1,
    wifi: -1
})

const roomList = ref([] as room[])

const getListData = async () => {
    const current = page.current
    const size = page.size
    const order = page.order
    const prop = page.prop
    const bedType = page.bedType
    const breakfast = page.breakfast
    const policy = page.policy
    const wifi = page.wifi
    const res = await roomListAPI({ current, size, order, prop, bedType, breakfast, policy, wifi })
    if (res.code == 200) {
        let list: room[] = res.data.records
        roomList.value = check(list)

        page.size = res.data.size
        page.total = res.data.total

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }


    page.total = res.data.total
}

//整理
const check = (list: room[]) => {
    list.forEach((item: room) => {
        switch (item.wifi) {
            case 0:
                item.wifiText = '无'
                break
            case 1:
                item.wifiText = '有'
                break
            default:
                item.wifiText = '异常'
        }
        switch (item.breakfast) {
            case 0:
                item.breakfastText = '无'
                break
            case 1:
                item.breakfastText = '有'
                break
            default:
                item.breakfastText = '异常'
        }
        switch (item.policy) {
            case 0:
                item.policyText = '免费退订'
                break
            case 1:
                item.policyText = '不可退订'
                break
            default:
                item.breakfastText = '异常'
        }
        switch (item.bedType) {
            case 0:
                item.bedTypeText = '大床'
                break
            case 1:
                item.bedTypeText = '双人床'
                break
            case 2:
                item.bedTypeText = '单人床'
                break
            default:
                item.breakfastText = '异常'
        }

    })
    return list
}


//排序
const changeHandle = (column: { order: string; prop: string; }) => {
    page.order = column.order
    page.prop = column.prop
    getListData()

}


//翻页
const pageChangeHandle = (current: number) => {
    page.current = current
    getListData()

}


onMounted(() => {
    getListData()
})

//时间选择
const timeZone = ref({})


//筛选
const handleSelect = () => {
    getListData()
}


//预定
const book = (item: room) => {
    const roomId: string = item.roomId
    router.push({
        path: 'order/book',
        query: {
            roomId
        }
    })
}

//禁止选择今天之前的时间
const disabledDate = (time: any) => {
    return time.getTime() < Date.now() - 8.64e7
}
</script>

<style lang="scss" scoped>
.wrap {
    background-color: #fff;
    margin: 20px 0;

    h2 {
        margin-left: 20px;
    }

    .controller {
        padding: 24px;
    }

    .symbol {
        font-size: 12px;
        color: #ff704a;

    }

    .price {
        font-size: 24px;
        color: #ff704a;

    }

    .book {
        background-color: #ff704a;
        border: 0;
    }

    .el-tag {
        margin: 0 2px;
        padding: 0 5px;
    }

    .pagination {
        width: 100%;
        padding: 16px 0;
        display: flex;
        justify-content: center;
    }

}

.screen {
    margin-left: 12px;
    margin-top: 20px;

}
</style>