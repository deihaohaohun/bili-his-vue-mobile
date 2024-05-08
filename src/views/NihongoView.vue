<script setup lang="ts">
import { nanoid } from 'nanoid';

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

const active = ref(Number(localStorage.getItem('active') || 0));
const grammars = ref<Grammar[]>([
  {
    id: nanoid(),
    title: '～あげく',
    connection: ['vた'],
    meaning: ['反复做某事或者持续做某事很长时间之后, 出现不好的结果'],
    level: 2,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～かわり（に）',
    connection: ['piなの'],
    meaning: ['代替, 取代', '另一方面', '代价'],
    level: 2,
    sort: 0
  },
])

const filterGrammar = (idx: number) => {
  active.value = idx
  localStorage.setItem('active', String(active.value))
}

const computedGrammar = computed(() => {
  return grammars.value.filter(grammar => {
    if (active.value === 0) {
      return true
    } else {
      return grammar.level === active.value
    }
  })
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
      <div class="p-2 border m-1 rounded-md" v-for="grammar of computedGrammar" :key="grammar.id"
        @click="toDetail(grammar)">
        {{ grammar.title }}
      </div>
      <p class="text-center text-sm">没有更多了...</p>
    </div>

    <van-floating-bubble axis="xy" icon="chat" magnetic="x" @click="clearCondition" />
  </div>
</template>

<style lang="scss" scoped></style>