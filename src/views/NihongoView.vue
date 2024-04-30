<script setup lang="ts">
const router = useRouter()
const toDetail = () => {
  router.push('/nihongo/detail')
}
const active = ref(0);
</script>

<template>
  <div class="flex h-[100svh]">
    <van-sidebar v-model="active">
      <van-sidebar-item title="N2" />
      <van-sidebar-item title="N3" />
      <van-sidebar-item title="N4" />
      <van-sidebar-item title="N5" />
    </van-sidebar>
    <div class="grammars flex-1 h-full overflow-scroll">
      <div class="p-2 border m-1 rounded-md" @click="toDetail">～あげく</div>
      <div class="p-2 border m-1 rounded-md">～うちに</div>
      <div class="p-2 border m-1 rounded-md">～かわり</div>
      <div class="p-2 border m-1 rounded-md">～おかげ</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>