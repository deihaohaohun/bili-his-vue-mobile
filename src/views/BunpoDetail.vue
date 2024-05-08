<script setup lang="ts">
const grammar = JSON.parse(localStorage.getItem('grammar')!)
</script>

<template>
  <div class="p-2">
    <h1 class="text-3xl">N{{ grammar.level }}: {{ grammar.title }}</h1>


    <div class="connection my-2 bg-slate-200 p-2 rounded-md">
      <p class="text-xl" v-for="con of grammar.connection" :key="con">{{ con }}</p>
    </div>

    <div class="meanings bg-slate-200 p-2 rounded-md">
      <p class="text-base bg-slate-300 p-2 rounded-md mb-2" :class="{ 'mb-0': idx === grammar.meaning.length - 1 }"
        v-for="mean, idx of grammar.meaning" :key="mean">{{ mean }}
      </p>
    </div>

    <div class="btns absolute bottom-8 flex justify-center w-full left-0 gap-8">
      <van-button type="danger">忘记了</van-button>
      <van-button type="primary">记住了</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>