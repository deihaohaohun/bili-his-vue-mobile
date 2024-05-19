<script setup lang="ts">
import { getVideos, updateVideoCover, updateVideos, createVideo } from '@/apis/video';
import PageCmp from '@/components/PageCmp.vue';
import VideoCmp from '@/components/VideoCmp.vue';
import BScroll from '@better-scroll/core'
import { usePage } from '@/utils/page';
import type { Video, VideoStatus } from '@/types/video';
import { throttle } from 'lodash-es'
import { showToast, type UploaderInstance } from 'vant';
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
  let id
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
      id = clickedVideo.value?.id
      await updateVideos({ id: id!, cover: url })
      clickedVideo.value!.cover = url
      break
  }
  showImgActions.value = false
}
async function afterRead(file: UploaderFileListItem | UploaderFileListItem[]) {
  console.log(file)
}

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

// 标记视频为已观看后刷新列表高度
const refreshList = async () => {
  await nextTick()
  scroll.refresh()
}
const newVideoVisible = ref(false)
const showNewVideoModal = () => {
  resetVideoForm();
  newVideoVisible.value = true;
}
const videoForm = reactive({
  title: '',
  type: 'Bangumi',
  total: 1,
  status: 'Todo'
})
const submitVideoForm = async (values: any) => {
  await createVideo(values);
  showToast('新建视频成功,请刷新页面获取最新数据~');
  newVideoVisible.value = false
};
const resetVideoForm = () => {
  videoForm.title = ''
  videoForm.type = 'Bangumi'
  videoForm.total = 1
}
</script>

<template>
  <PageCmp title="哔哩历史">
    <template #right>
      <van-icon name="plus" size="18" @click="showNewVideoModal" />
    </template>
    <van-popup v-model:show="newVideoVisible" position="bottom" class="pb-8">
      <van-form @submit="submitVideoForm">
        <van-cell-group inset>
          <van-field v-model="videoForm.title" name="title" label="视频名称" placeholder="视频名称"
            :rules="[{ required: true, message: '请填写视频名称' }]" />
          <van-field name="status" label="视频状态">
            <template #input>
              <van-radio-group v-model="videoForm.status" class="flex flex-col gap-1 pt-1">
                <van-radio name="Todo">准备看</van-radio>
                <van-radio name="Done">已看过</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="type" label="视频类型">
            <template #input>
              <van-radio-group v-model="videoForm.type" class="flex flex-col gap-1 pt-1">
                <van-radio name="Bangumi">番剧</van-radio>
                <van-radio name="Movie">电影</van-radio>
                <van-radio name="3Documentary">纪录片</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="total" label="总集数">
            <template #input>
              <van-stepper v-model="videoForm.total" />
            </template>
          </van-field>
          <van-button block type="primary" native-type="submit">
            新建视频
          </van-button>
        </van-cell-group>
      </van-form>
    </van-popup>

    <div class="videos h-full overflow-hidden pt-1 px-1">
      <!-- 滚动主体区域 -->
      <div>
        <div class="grid grid-cols-3 gap-1 p-1">
          <van-button @click="changeType('Doing')" :type="type === 'Doing' ? 'primary' : 'default'"
            size="mini">在看</van-button>
          <van-button @click="changeType('Todo')" :type="type === 'Todo' ? 'primary' : 'default'"
            size="mini">想看</van-button>
          <van-button @click="changeType('Done')" :type="type === 'Done' ? 'primary' : 'default'"
            size="mini">已看</van-button>
        </div>
        <div class="flex flex-col gap-1 bg-slate-100 py-1">
          <VideoCmp v-for="(item, index) in videos" :key="index" :video="item" @changeCover="showSelectImg"
            :refresh="refreshList">
          </VideoCmp>
        </div>
        <p ref="loadMore" class="text-center py-2">{{ p.noMore ? '没有更多数据了' : '努力加载中' }}</p>
      </div>
    </div>

    <van-action-sheet v-model:show="showImgActions" :actions="actions" cancel-text="取消" description="选择图片来源"
      @select="onSelect" />
    <van-uploader ref="uploaderRef" v-show="false" :after-read="afterRead" />
  </PageCmp>
</template>

<style lang="scss" scoped></style>