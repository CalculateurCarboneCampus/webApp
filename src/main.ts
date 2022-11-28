import './style/_main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useDataStore} from "@/stores/dataStore"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const response = await window.fetch('https://api.campus-carbone.ch/', {})

useDataStore().setCCCData(await response.json())
