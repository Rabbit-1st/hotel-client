<template>
    <div class="wrap">
        <el-button @click="back">返回</el-button>
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
                        <p v-if="item.status!==3" @click="item.policy === 0 ? cancel(item.orderId) : ''"
                            :class="item.policy === 0 ? 'cancel' : ''">{{
                                item.policyText }}</p>
                                <P v-if="item.status===3">已退订</P>
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

import { order, orderListAPI, orderListForm, orderUpdateAPI } from '@/apis/order'
import { ElMessage } from 'element-plus'
import days from 'dayjs'
import { useUserStore } from '@/stores/user'
import router from '@/routers'
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



const cancel = async (orderId: string) => {
    const status = 3
    const res = await orderUpdateAPI({ orderId, status })
    if(res.code === 200){
        ElMessage.success({
            message: '取消订单成功'
        })

        getListData()
    }

}






//翻页
const pageChangeHandle = (current: number) => {
    page.current = current
    getListData()

}

onMounted(() => {
    getListData()
})

//返回
const back = () => {
    router.go(-1)
}


</script>

<style lang="scss" scoped>
.wrap {
    background-color: #fff;
    width: 1024px;
    margin: 20px auto;

    button {
        margin: 24px 0 0 40px;
        font-size: 12px;
    }

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

        &:hover {
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

                .cancel {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .line {
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

        &:hover {
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