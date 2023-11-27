type VideoType = 'Bangumi' | 'Documentary' | 'Movie'

type VideoStatus = 'Doing' | 'Todo' | 'Done'

export type Video = {
  id: string
  title: string
  cover: string
  createdAt?: Date | string
  finishedAt?: Date | string | null
  type: VideoType
  total: number
  current: number
  status: VideoStatus
}
