<script setup lang="ts">
import { ref } from 'vue';

defineProps(['title'])

const idx = ref(0)
</script>

<template>
  <div class="page flex flex-col">
    <van-nav-bar :title="title || '标题'" />
    <div class="flex-1 overflow-hidden">
      <slot>
        content
      </slot>
    </div>
    <van-tabbar v-model="idx">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.page {
  height: 100svh;
  padding-bottom: 50px;
}
</style>