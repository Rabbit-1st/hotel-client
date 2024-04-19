<template>
  <h2>设置主页图片</h2>
  <el-upload v-model:file-list="fileList" list-type="picture-card" multiple :auto-upload="false"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img  class="iamge" w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  <el-button @click="submit">提交</el-button>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'
import { imageListAPI, mainImageAPI, type image, removeImageAPI } from '@/apis/main'


const fileList = ref<UploadUserFile[]>([

])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const getListData = async () => {
  const res = await imageListAPI()

  const list: UploadUserFile[] = []
  res.data.forEach((item: image) => {
    const newItem = {
      name: item.name,
      url: item.url
    }
    list.push(newItem)
  })

  fileList.value = list
  console.log(fileList.value);
}

onMounted(() => {
  getListData()
})





const submit = async () => {
  const formData = new FormData()
  fileList.value.forEach(element => {
    formData.append("imageList", element.raw!)
  })


  const res = await mainImageAPI({ formData })
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
  } else {
    ElMessage.warning({
      message: res.msg
    })
  }

}

const handleRemove: UploadProps["onRemove"] = async (uploadFile) => {
  const name = uploadFile.name
  console.log(name);

  const res = await removeImageAPI({ name })
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
  } else {
    ElMessage.warning({
      message: res.msg
    })
  }
}

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 12px;
}

p {
  font-size: 14px;
  margin-top: 7px;
  margin-bottom: 5px;
}

.iamge{
  max-width: 928px;
}
</style>