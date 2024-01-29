import type { R } from '@/types/r'
import { tGet, tPut } from '../utils/request'
import type { ResPage } from '@/types/r-page'
import type { Video } from '@/types/video'

export function getVideos(type: 'Doing' | 'Todo' | 'Done', page: number, size: number) {
  return tGet<Video, R<ResPage<Video>>>(`/video/${type}/${page}/${size}`)
}

export function addVideoHistory(id: string, data: any) {
  return tPut<Video>(`/video/${id}`, data)
}

export function updateVideoCover(id: string, data: any) {
  return tPut<Video>(`/video/cover/${id}`, data)
}

export function finishVideo(id: string) {
  return tPut<Video>(`/video/cover/${id}`)
}
