import { nanoid } from 'nanoid'
import { showToast } from 'vant'
import axios from 'axios'

const req = axios.create()

export const readTextFromClipboard = async (): Promise<string> => {
  return navigator.clipboard.readText()
}
export const readImgFromClipboard = async (title: string): Promise<string> => {
  return navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      return navigator.clipboard.read().then(async (data) => {
        if (!data[0].types.includes('image/png')) {
          throw new Error('未检测到图片')
        }
        const blob = await data[0].getType('image/png')
        const base64: string = await blob2base64(blob)

        return await uploadImg2Gitee(title, base64)
      })
    } else {
      showToast('读取剪切板失败惹 o.o')
      return ''
    }
  })
}

export const blob2base64 = async (blob: any): Promise<string> => {
  return new Promise((r) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl?.split(',')[1]
      r(base64)
    }
    reader.readAsDataURL(blob)
  })
}

type GiteeResponse = {
  content: {
    download_url: string
  }
}
async function uploadImg2Gitee(title: string, base64: string) {
  const giteeName = nanoid()
  const resp = await req.post<GiteeResponse>(
    `https://gitee.com/api/v5/repos/deihaohaohun/picgo-img-bed/contents/${giteeName}.png`,
    {
      access_token: '3900b0a7dea9a8f5fa67e8c0ed6b8c16',
      content: base64,
      message: `${title}封面图`
    }
  )
  return resp.data.content.download_url
}
