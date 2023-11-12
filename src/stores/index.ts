import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(persist)

export { pinia }

export * from './modules/user'
