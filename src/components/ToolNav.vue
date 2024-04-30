<script setup lang="ts">
import { nanoid } from 'nanoid';

const width = ref(0)
const left = ref(0)
const menus = [{ name: '哔哩历史', id: nanoid(), routerName: '/' }, { name: '日语', id: nanoid(), routerName: '/nihongo' }, { name: '钢铁匣', id: nanoid(), routerName: 'passbox' }];
const menusRefs = ref<HTMLDivElement[]>([])
const position = ref(0)
const router = useRouter()

onMounted(() => {
  width.value = menusRefs.value[position.value]!.offsetWidth
  left.value = menusRefs.value[position.value]!.offsetLeft
})

const switchMenu = (idx: number, routerName: string) => {
  position.value = idx
  width.value = menusRefs.value[position.value]!.offsetWidth
  left.value = menusRefs.value[position.value]!.offsetLeft;
  router.push(routerName)
}

</script>

<template>
  <div id="nav" class="inline-flex gap-2 p-3 bg-white">
    <div class="nav-item bg-slate-300" id="slide" :style="{ width: width + 'px', left: left + 'px' }"></div>
    <div v-for="(menu, idx) of menus" :key="menu.id" ref="menusRefs" class="nav-item"
      @click="switchMenu(idx, menu.routerName)">
      <span class="text">{{ menu.name }}</span>
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