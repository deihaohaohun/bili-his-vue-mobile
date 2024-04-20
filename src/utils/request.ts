import { useUserStore } from '@/stores'
import router from '@/router'
import axios from 'axios'
import { showToast } from 'vant'

const baseURL = ['production', 'prd'].includes(import.meta.env.MODE)
  ? 'http://60.205.157.192:3000'
  : 'http://localhost:3000'
// 1. 新axios实例，基础配置
const req = axios.create({
  baseURL,
  timeout: 10000
})

// 2. 请求拦截器，携带token
req.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 3. 响应拦截器，剥离无效数据，401拦截
req.interceptors.response.use(
  (res) => {
    // 后台约定, 响应成功，但是 code 不是 200, 是业务逻辑失败
    if (res.data?.code !== 200) {
      showToast(res.data?.message || '业务失败')
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

const tGet = req.get
const tPut = req.put
const tPost = req.post

export { tGet, tPut, tPost }
