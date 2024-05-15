<script setup lang="ts">
const grammar = JSON.parse(localStorage.getItem('grammar')!)
</script>

<template>
  <div class="p-2">
    <h1 class="text-2xl bg-[#E56453] p-2 rounded-md text-white">N{{ grammar.level }}: {{ grammar.title }}</h1>

    <div class="border-2 border-slate-300 rounded-md my-2 p-2">
      <h3 class="font-bold">[接续]</h3>
      <div class="connection my-2">
        <p class="text-xl" v-for="con of grammar.connection" :key="con">{{ con }}</p>
      </div>

      <h3 class="font-bold">[含义]</h3>
      <div class="meanings my-2">
        <p class="text-base" :class="[idx === 0 ? 'mt-0' : 'mt-2']" v-for="mean, idx of grammar.meaning" :key="mean">{{
      mean }}
        </p>
      </div>
    </div>

    <h1 class="text-2xl bg-[#E56453] p-2 rounded-md text-white">例句</h1>
    <div class="border-2 border-slate-300 rounded-md my-2 p-2">
      <h3 class="font-bold">[vた]</h3>
      <div class="connection my-2">
        <p class="text-xl" v-for="con of grammar.connection" :key="con">{{ con }}</p>
      </div>
    </div>

    <div class="btns absolute bottom-8 flex justify-center w-full left-0 gap-8">
      <van-button color="#E56453">忘记了</van-button>
      <van-button type="primary">记住了</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>