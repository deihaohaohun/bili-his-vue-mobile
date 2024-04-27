<script setup lang="ts">
defineProps(['title'])

</script>

<template>
  <div class="page flex flex-col">
    <van-nav-bar :title="title || '标题'">
      <template #right>
        <slot name="right">
        </slot>
      </template></van-nav-bar>
    <div class="flex-1 overflow-hidden">
      <slot>
        content
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  height: 100svh;
}
</style>