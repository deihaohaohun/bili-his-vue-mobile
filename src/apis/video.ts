import { tGet, tPut } from '../utils/request'

export function getVideos<T>(type: 'Doing' | 'Todo' | 'Done' = 'Doing') {
  return tGet<T>(`/video/${type}`)
}

export function addVideoHistory<T>(id: string, data: any) {
  return tPut<T>(`/video/${id}`, data)
}
