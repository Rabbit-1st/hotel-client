<template>
  <div class="lockRoom">
    <label>锁定房源</label>
    <p>10分钟内支付，完成预订</p>

  </div>


  <div class="mainBook">
    <p class="name">{{ roomInfo.name }}</p>
    <p class="info">{{ roomInfo.bedTypeText }}</p>
    <p class="info">餐食：<span>{{ roomInfo.breakfastText }}</span>WiFi：<span>{{ roomInfo.wifiText }}</span>政策：<span>{{
      roomInfo.policyText }}</span></p>


    <p class="price">{{ Number.isNaN(total) ? roomInfo.price : roomInfo.price * total }}<span v-show="!Number.isNaN(total)">{{ `(￥${roomInfo.price}*${total}天)` }}</span></p>
    <p class="info free" v-if="roomInfo.policy == 0">04月18日18:00前免费取消</p>
  </div>

  <div class="form">
    <p class="">入住信息</p>
    <el-form label-width="auto" :model="form">
      <el-form-item label="入离时间选择" prop="phone">
        <el-date-picker v-model="form.timeZone" type="daterange" range-separator="To" start-placeholder="入住日期"
          end-placeholder="退房日期" :disabled-date="disabledDate" />
      </el-form-item>
      <p class="total" v-show="!Number.isNaN(total)">共{{ total }}天</p>

      <p class="contact">联系人</p>
      <el-form-item label="姓" prop="lastname">
        <el-input v-model="form.lastname" />
      </el-form-item>
      <el-form-item label="名" prop="firstname">
        <el-input v-model="form.firstname" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-button class="submit" type="success" @click="submitForm">提交订单</el-button>

    </el-form>




  </div>
</template>

<script setup lang="ts">
import { getRoomInfoAPI, room } from "@/apis/room";
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user";
import { orderAddAPI } from "@/apis/order";
import { ElMessage } from "element-plus";
import router from "@/routers";


const route = useRoute()

const roomInfo = ref<room>({
  roomId: "",
  name: "",
  bedType: 0,
  bedTypeText: "",
  breakfast: 0,
  breakfastText: "",
  wifi: 0,
  wifiText: "",
  number: "",
  price: 0,
  people: "",
  policy: 0,
  policyText: "",
  numberMax: "",
  images: []
})


const getData = async () => {
  const roomId: string = route.query.roomId as string
  const res = await getRoomInfoAPI({ roomId })
  if (res.code === 200) {
    roomInfo.value = res.data
    switch (roomInfo.value.wifi) {
      case 0:
        roomInfo.value.wifiText = '无'
        break
      case 1:
        roomInfo.value.wifiText = '有'
        break
      default:
        roomInfo.value.wifiText = '异常'
    }
    switch (roomInfo.value.breakfast) {
      case 0:
        roomInfo.value.breakfastText = '无'
        break
      case 1:
        roomInfo.value.breakfastText = '有'
        break
      default:
        roomInfo.value.breakfastText = '异常'
    }
    switch (roomInfo.value.policy) {
      case 0:
        roomInfo.value.policyText = '免费退订'
        break
      case 1:
        roomInfo.value.policyText = '不可退订'
        break
      default:
        roomInfo.value.breakfastText = '异常'
    }
    switch (roomInfo.value.bedType) {
      case 0:
        roomInfo.value.bedTypeText = '大床'
        break
      case 1:
        roomInfo.value.bedTypeText = '双人床'
        break
      case 2:
        roomInfo.value.bedTypeText = '单人床'
        break
      default:
        roomInfo.value.breakfastText = '异常'
    }
  }
}

const userStore = useUserStore()
//提交订单
const form = ref({
  timeZone: [],
  lastname: '',
  firstname: '',
  phone: '',

})

const submitForm = async () => {
  console.log(form.value);
  const userId = userStore.userInfo.id
  const roomType = roomInfo.value.roomId
  const status = 0

  if (form.value.timeZone.length < 1) {
    ElMessage.warning({
      message: '必须选择入离时间'
    })
    return
  }

  const checkInDate = new Date(form.value.timeZone[0]).getTime()
  const checkOutDate = new Date(form.value.timeZone[1]).getTime()



  const res = await orderAddAPI({ userId, roomType, status, checkInDate, checkOutDate })
  if (res.code == 200) {
    ElMessage.success({
      message: res.msg
    })
    router.push('/home')


  } else {
    ElMessage.warning({
      message: res.msg
    })
  }

}

onMounted(() => {
  getData()
  form.value.lastname = userStore.userInfo.lastname
  form.value.firstname = userStore.userInfo.firstname
  form.value.phone = userStore.userInfo.phone
})


const instance = getCurrentInstance();
const $dayjs = instance?.appContext.config.globalProperties.$dayjs;

const total = computed(() => {
  return $dayjs(new Date(form.value.timeZone[1])).diff(
    new Date(form.value.timeZone[0]),
    "day"
  );
})

//禁止选择今天之前的时间
const disabledDate = (time: any) => {
  return time.getTime() < Date.now() - 8.64e7
}
</script>

<style lang="scss" scoped>
.lockRoom {
  width: 1024px;
  margin: 24px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  display: flex;

  label {
    font-weight: bold;
    color: #00db90;
    margin-right: 10px;
  }
}

.mainBook {
  width: 1024px;
  margin: 24px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;


  .name {
    font-weight: bold;
  }

  .info {
    color: #666;
    font-size: 14px;
    margin-top: 6px;
  }

  span {
    color: #ff714a;
    margin-right: 16px;
  }

  .price {
    color: #ff704a;
    font-size: 32px;
    font-weight: bold;
    margin-top: 10px;

    &::before {
      content: "￥";
      font-size: 16px;

    }

    span {
      font-size: 16px;
      margin: 0;
    }
  }

  .free {
    color: #08b2cc;
  }
}

.form {
  width: 1024px;
  margin: 24px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;

}

.contact {
  font-size: 14px;
}

.total {
  color: #ff704a;
  text-align: right;
  font-size: 14px;
}
</style>