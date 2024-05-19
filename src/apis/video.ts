import type { R } from '@/types/r'
import { tGet, tPost, tPut } from '../utils/request'
import type { ResPage } from '@/types/r-page'
import type { Video } from '@/types/video'

export function createVideo(data: { title: string; type: string; total: number }[]) {
  return tPost<Video, R<Video>>(`/video`, data)
}

export function updateVideos(data: { id: string; cover: string }) {
  return tPut<Video, R<Video>>(`/video`, data)
}

export function getVideos(type: 'Doing' | 'Todo' | 'Done', page: number, size: number) {
  return tGet<Video, R<ResPage<Video>>>(`/video/${type}/${page}/${size}`)
}

export function startVideoById(id: string) {
  return tPut<Video>(`/video/start/${id}`)
}

export function addVideoHistory(id: string) {
  return tPut<Video>(`/video/${id}`)
}

export function updateVideoCover(id: string, data: any) {
  return tPut<Video>(`/video/cover/${id}`, data)
}

export function finishVideo(id: string) {
  return tPut<Video>(`/video/cover/${id}`)
}
