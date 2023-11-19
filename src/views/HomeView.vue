<script setup lang="ts">
import { getVideos } from '@/apis/video';
import PageCmp from '@/components/PageCmp.vue';
import VideoCmp from '@/components/VideoCmp.vue';
import { onMounted, ref } from 'vue';
import BScroll from '@better-scroll/core'


const videos = ref([])

onMounted(() => {
  getVideos<any>().then(res => {
    console.log(res)
    videos.value = res.data.data
  })

  setTimeout(() => {
    new BScroll('.videos', {
      scrollY: true,
      click: true
    })
  }, 300);
})
</script>

<template>
  <PageCmp title="首页">
    <div class="videos h-full overflow-hidden mb-14 pt-1 px-1">
      <div class="grid grid-cols-3 gap-1">
        <VideoCmp v-for="(item, index) in videos" :key="index" :video="item"></VideoCmp>
      </div>
    </div>
  </PageCmp>
</template>

<style lang="scss" scoped></style>