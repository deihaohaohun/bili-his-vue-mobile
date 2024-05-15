<script setup lang="ts">
import { grammars as listOfGrammar } from '../data/grammars'

const router = useRouter()
const toDetail = (grammar: Grammar) => {
  router.push('/nihongo/detail')
  localStorage.setItem('grammar', JSON.stringify(grammar))
}
type Grammar = {
  id: string | number
  [key: string]: any
  level: number
}

const active = ref(Number(localStorage.getItem('active') || 0))
const grammars = ref<Grammar[]>(listOfGrammar)

const filterGrammar = (idx: number) => {
  active.value = idx
  localStorage.setItem('active', String(active.value))
}

const computedGrammar = computed(() => {
  let data = grammars.value.filter((grammar) => {
    if (active.value === 0) {
      return true
    } else {
      return grammar.level === active.value
    }
  })
  data = data.sort((a, b) => a.sort - b.sort)
  return data
})

const clearCondition = () => {
  active.value = 0
}
</script>

<template>
  <div class="flex h-[100svh]">
    <van-sidebar v-model="active" @change="filterGrammar($event)">
      <van-sidebar-item title="全部" />
      <van-sidebar-item title="N1" />
      <van-sidebar-item title="N2" />
      <van-sidebar-item title="N3" />
      <van-sidebar-item title="N4" />
      <van-sidebar-item title="N5" />
    </van-sidebar>
    <van-empty class="w-full" v-if="computedGrammar.length === 0" description="描述文字" />
    <div v-else class="grammars flex-1 h-full overflow-scroll">
      <div class="p-2 border m-1 rounded-md flex justify-between items-center" v-for="grammar of computedGrammar"
        :key="grammar.id" @click="toDetail(grammar)">
        {{ grammar.title }}

        <van-tag mark type="primary">N{{ grammar.level }}</van-tag>
      </div>
      <p class="text-center text-sm">没有更多了...</p>
    </div>

    <van-floating-bubble axis="xy" icon="chat" magnetic="x" @click="clearCondition" />
  </div>
</template>

<style lang="scss" scoped></style>
