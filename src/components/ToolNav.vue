<script setup lang="ts">

const width = ref(0)
const left = ref(0)
const nihongo = ref<HTMLDivElement>()
const note = ref<HTMLDivElement>()

onMounted(() => {
  width.value = nihongo.value!.offsetWidth
  left.value = nihongo.value!.offsetLeft
})

// TODO: 暂时写死, 后续改为动态修改菜单宽度和边距
const switchMenu = (bool: boolean) => {
  if (bool) {
    width.value = nihongo.value!.offsetWidth
    left.value = nihongo.value!.offsetLeft;
  } else {
    width.value = note.value!.offsetWidth
    left.value = note.value!.offsetLeft;
  }
}

</script>

<template>
  <div id="nav" class="inline-flex gap-2 p-3 bg-white">
    <div class="nav-item bg-slate-300" id="slide" :style="{ width: width + 'px', left: left + 'px' }"></div>
    <div class="nav-item" ref="nihongo" @click="switchMenu(true)">
      <span class="text">日语</span>
    </div>
    <div class="nav-item" ref="note" @click="switchMenu(false)">
      <span class="text">复习笔记</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  position: relative;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  align-items: center;
  border-radius: 50px;

  .nav-item {
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
  }

  #slide {
    position: absolute;
    display: inline-block;
    height: 30px;
    border-radius: 50px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    z-index: 2;
  }

  .text {
    position: relative;
    z-index: 3;
  }
}
</style>