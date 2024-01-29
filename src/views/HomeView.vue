<script setup lang="ts">
import { getVideos, updateVideoCover } from '@/apis/video';
import PageCmp from '@/components/PageCmp.vue';
import VideoCmp from '@/components/VideoCmp.vue';
import { onMounted, ref } from 'vue';
import BScroll from '@better-scroll/core'
import { usePage } from '@/utils/page';
import type { Video, VideoStatus } from '@/types/video';
import { throttle } from 'lodash-es'
import { showToast, type UploaderInstance } from 'vant';
import Fuse from 'fuse.js'
import type { ActionSheetAction, UploaderFileListItem } from 'vant';
import { readImgFromClipboard, readTextFromClipboard } from '@/utils/img';


const type = ref<VideoStatus>('Doing')
function changeType(clickedType: VideoStatus) {
  type.value = clickedType
  videos.value = []
  reset()
}

const loadMore = ref()
const videos = ref<Video[]>([])
const { p, reset } = usePage()
let scroll: BScroll

const loadVideo = throttle(() => {
  if (p.noMore) return
  let { page, size } = p
  getVideos(type.value, page, size).then(res => {
    videos.value.push(...res.data.data)
    p.page++
    p.noMore = res.data.noMore
    nextTick(() => {
      scroll.refresh()
    })
  })
}, 2000)

const searchShow = ref(false)
let searchedActions: any[] = []
const search = () => {
  const options = {
    keys: ['title']
  }
  const fuse = new Fuse<Video>(videos.value, options)
  const result = fuse.search(keyword.value)
  if (result.length === 0) {
    showToast('没有搜索到数据, 加载更多数据再试试吧~')
  } else {
    searchShow.value = true
    searchedActions = result.map(r => ({ name: r.item.title }))
  }
}

const uploaderRef = ref<UploaderInstance>()
const showImgActions = ref(false);
const actions = [
  { name: '本地图片' },
  { name: '网络图片' },
  { name: '剪切板图片' },
];
const clickedVideo = ref<Video>()
function showSelectImg(v: Video) {
  clickedVideo.value = v
  showImgActions.value = true
}
async function onSelect(item: ActionSheetAction) {
  let url
  switch (item.name) {
    case '本地图片':
      uploaderRef.value?.chooseFile();
      break
    case '剪切板 url':
      url = await readTextFromClipboard()
      await updateVideoCover(clickedVideo.value!.id, { url })
      clickedVideo.value!.cover = url
      break
    case '剪切板图片':
      url = await readImgFromClipboard(clickedVideo.value!.title)
      clickedVideo.value!.cover = url
      break
  }
  showImgActions.value = false
}
async function afterRead(file: UploaderFileListItem | UploaderFileListItem[]) {
  console.log(file)
}

const keyword = ref('')

onMounted(() => {
  setTimeout(() => {
    scroll = new BScroll('.videos', {
      scrollY: true,
      click: true,
    })

    const loadMoreElement = new IntersectionObserver((entries) => {
      // 如果 intersectionRatio 为 0，则目标在视野外
      if (entries[0].intersectionRatio <= 0) return;
      loadVideo()
    }, { threshold: 1 });
    // 开始监听
    loadMoreElement.observe(loadMore.value)
  }, 300);
})
</script>

<template>
  <PageCmp title="哔哩历史">
    <div class="videos h-full overflow-hidden mb-14 pt-1 px-1">
      <!-- 滚动主体区域 -->
      <div>
        <div class="grid grid-cols-3 gap-1 pt-2 px-2">
          <van-button @click="changeType('Doing')" :type="type === 'Doing' ? 'primary' : 'default'"
            size="mini">在看</van-button>
          <van-button @click="changeType('Todo')" :type="type === 'Todo' ? 'primary' : 'default'"
            size="mini">想看</van-button>
          <van-button @click="changeType('Done')" :type="type === 'Done' ? 'primary' : 'default'"
            size="mini">已看</van-button>
        </div>
        <van-search v-model="keyword" placeholder="在已查询の数据中搜索" @search="search" />
        <div class="flex flex-col gap-1 bg-slate-100">
          <VideoCmp v-for="(item, index) in videos" :key="index" :video="item" @changeCover="showSelectImg">
          </VideoCmp>
        </div>
        <p ref="loadMore" class="text-center py-2">{{ p.noMore ? '没有更多数据了' : '努力加载中' }}</p>
      </div>
    </div>

    <van-action-sheet v-model:show="showImgActions" :actions="actions" cancel-text="取消" description="选择图片来源"
      @select="onSelect" />
    <van-uploader ref="uploaderRef" v-show="false" :after-read="afterRead" />
    <van-action-sheet v-model:show="searchShow" :actions="searchedActions" cancel-text="取消" close-on-click-action />
  </PageCmp>
</template>

<style lang="scss" scoped></style>