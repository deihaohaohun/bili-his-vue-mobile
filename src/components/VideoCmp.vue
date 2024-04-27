<script setup lang="ts">
import { addVideoHistory, startVideoById } from '@/apis/video';
import type { Video } from '@/types/video';
import { showToast, showConfirmDialog } from 'vant';

const { video, refresh } = defineProps<{ video: Video, refresh: () => void }>()
const emit = defineEmits<{
  changeCover: [video: Video]
}>()

const current = ref(video.current)
const finished = ref(false)
const isFinish = computed(() => current.value === video.total)

const addHistory = async () => {
  await showConfirmDialog({
    message: isFinish.value ? '标记看过?' : '追一集?',
  })
  await addVideoHistory(video.id)
  if (!isFinish.value) {
    current.value++
    showToast('进度 +1')
  } else {
    finished.value = true
    showToast('成就 +1')
    refresh()
  }
}

function changeCover() {
  emit('changeCover', video)
}

const startVideo = async () => {
  showToast('开始追~')
  finished.value = true
  await startVideoById(video.id)
  refresh()
}
</script>

<template>
  <div v-if="!finished" class="video flex bg-white p-1 relative">
    <!-- note: flex-shrink-0 解决了图片设置相同宽度但是有些图片却变窄了的问题 -->
    <div class="relative shadow-md rounded-md overflow-hidden flex-shrink-0">
      <img class="w-[130px] aspect-[3/4] object-fill block" :src="video.cover" @click="changeCover">

      <div class="absolute bottom-1 right-1 text-xs px-2 py-1 rounded-md overflow-hidden backdrop-blur-md font-bold">
        全 {{ video.total }} 话
      </div>
    </div>

    <div class="px-2">
      <h4>{{ video.title }}</h4>
      <h5 v-if="video.status === 'Doing'" class="text-sm text-gray-400">看到第 {{ current }} 话</h5>
      <h5 v-if="video.status === 'Todo'" class="text-sm text-gray-400">尚未观看</h5>
      <h5 v-if="video.status === 'Done'" class="text-sm text-gray-400">已看完</h5>
      <van-button v-if="video.status === 'Doing'" size="small" @click="addHistory">
        <span class="px-1">追一集</span>
      </van-button>
      <van-button v-if="video.status === 'Todo'" size="small" @click="startVideo">
        <span class="px-1">开始观看</span>
      </van-button>
    </div>

  </div>
</template>

<style lang="scss" scoped></style>