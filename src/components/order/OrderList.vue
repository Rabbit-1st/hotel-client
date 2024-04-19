<template>
    <div class="wrap">

        <div v-if="orderList.length > 0">

            <div class="row title">
                <div class="orderInfo">
                    <div class="left">
                        <p>名称</p>
                        <p>床型</p>
                        <p>入住人</p>
                        <p>入住日期</p>
                        <p>总价</p>
                        <p></p>
                    </div>
                    <div class="right">
                        <p>订单状态</p>
                    </div>

                </div>

            </div>

            <div class="row" v-for="(item, index) in  orderList" :index="index">
                <div class="orderNumber">
                    <p>
                        <span>{{ item.createDateText }}</span>
                        订单号：{{ item.orderId }}
                    </p>
                </div>
                <div class="orderInfo">
                    <div class="left line">
                        <p class="name">{{ item.roomName }}</p>
                        <p>{{ item.bedTypeText }}</p>
                        <p>{{ item.lastname + item.firstname }}</p>
                        <p>{{ item.checkInDateText }}</p>
                        <p class="price">￥{{ item.totalPrice }}</p>
                        <p>{{ item.policyText }}</p>
                    </div>
                    <div class="right">
                        <p>{{ item.statusText }}</p>

                    </div>

                </div>

            </div>

        </div>


        <div class="pagination">
            <el-pagination background :page-size="page.size" layout="prev, pager, next,jumper,total" :total="page.total"
                @current-change="pageChangeHandle" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { order, orderListAPI, orderListForm } from '@/apis/order'
import { ElMessage } from 'element-plus'
import days from 'dayjs'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

interface addTotal {
    total: number
}

const page: orderListForm & addTotal = reactive({
    current: 1,
    size: 10,
    order: 'descending',
    prop: 'createTime',
    status: 0,
    total: 0,
    phone: '',
    userId: ''
})

const orderList = ref([] as order[])

const getListData = async () => {
    const current = page.current
    const size = page.size
    const order = page.order
    const prop = page.prop
    const status = page.status
    const phone = page.phone
    const userId = userStore.userInfo.id
    const res = await orderListAPI({ current, size, order, prop, status, phone, userId })
    if (res.code == 200) {
        let list: order[] = res.data.records
        orderList.value = check(list)
        console.log(orderList.value);

    } else {
        ElMessage.warning({
            message: res.msg
        })
    }

    page.size = res.data.size
    page.total = res.data.total
}

//整理
const check = (list: order[]) => {
    list.forEach((item: order) => {
        switch (item.status) {
            case 0:
                item.statusText = '未入住'
                break
            case 1:
                item.statusText = '已入住'
                break
            case 2:
                item.statusText = '已退房'
                break
            case 3:
                item.statusText = '已取消'
                break
            default:
                item.statusText = '异常'
        }
        switch (item.bedType) {
            case 0:
                item.bedTypeText = '大床房'
                break
            case 1:
                item.bedTypeText = '双人床'
                break
            case 2:
                item.bedTypeText = '单人床'
                break
            default:
                item.statusText = '异常'
        }
        switch (item.policy) {
            case 0:
                item.policyText = '免费退订'
                break
            case 1:
                item.policyText = '不可退订'
                break
            default:
                item.policyText = '异常'
        }
        item.createDateText = days(item.createDate).format('YYYY.MM.DD')
        item.checkInDateText = days(item.checkInDate).format('YYYY.MM.DD')
        item.checkOutDateText = days(item.checkOutDate).format('YYYY.MM.DD')
        if (null !== item.cancelDate) {
            item.cancelDateText = days(item.cancelDate).format('YYYY.MM.DD')
        } else {
            item.cancelDateText = '未取消'
        }

    })
    return list
}




//翻页
const pageChangeHandle = (current: number) => {
    page.current = current
    getListData()

}

onMounted(() => {
    getListData()
})




</script>

<style lang="scss" scoped>
.wrap {
    background-color: #fff;
    width: 1024px;
    margin: 20px auto;
    padding: 64px 0;

    .controller {
        height: 50px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1672px;
        margin: 0 auto;

        button {
            padding: 0 12px;
        }


        .status {
            width: 150px;
            max-width: 150px;
        }
    }


    .row {
        width: 886px;
        border: 1px solid #daf3ff;
        margin: 0 auto 10px;
        border-radius: 4px;
        &:hover{
            border: 1px solid #c2ecff;
        }
        .orderNumber {
            background-color: #d1f1ff;
            font-size: 12px;
            border-radius: 4px 4px 0 0;
            padding: 2px 8px;
        }

        .orderInfo {
            font-size: 14px;
            height: 50px;
            display: flex;
            justify-content: space-between;


            .left {
                display: flex;
                align-items: center;

                p {
                    display: inline-block;
                    width: 110px;
                    padding-left: 20px;
                    color: #333;
                }

                .name {
                    color: #11b3c9;
                }

                .price {
                    color: #ff704a;
                }
            }

            .line{
                border-right: 1px solid #daf3ff;
            }

            .right {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 106px;
            }
        }
    }

    .title {
        border: 0;
        height: 30px;
        &:hover{
            border: 0;
        }
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
</style>