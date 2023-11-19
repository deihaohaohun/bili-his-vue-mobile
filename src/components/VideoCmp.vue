<script setup lang="ts">
import { addVideoHistory } from '@/apis/video';
import { showToast, showConfirmDialog } from 'vant';

const props = defineProps(['video'])
const current = ref(props.video.current)

const addHistory = async () => {
  await showConfirmDialog({
    message: '追一集?',
  })
  await addVideoHistory(props.video.id, {})
  showToast('更新成功')
  current.value++
}
</script>

<template>
  <div class="relative shadow-md rounded-md overflow-hidden" v-if="video.curent !== video.total">
    <div class="h-[158px] overflow-hidden">
      <img class="w-full aspect-[3/4] object-fill" :src="video.cover" :alt="video.title">
    </div>

    <div class="absolute bottom-0 text-xs h-[32px] leading-[32px] text-center w-full backdrop-blur-md font-bold"
      @click="addHistory">
      {{ current }} / {{ video.total }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>