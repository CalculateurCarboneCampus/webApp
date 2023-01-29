import './style/_main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useDataStore} from "@/stores/dataStore"

const app = createApp(App)
export const apiUrl = 'https://api.campus-carbone.ch/'

app.use(createPinia())
app.use(router)

app.mount('#app')

async function main() {
    const response = await window.fetch(apiUrl, {})

    useDataStore().setCCCData(await response.json())

    const sessionUserId = sessionStorage.getItem('sessionUserId')
    const sessionUserPassword = sessionStorage.getItem('sessionUserPassword')

    if(sessionUserId === null) return
    if(sessionUserPassword === null) return

    useDataStore().user.connection(sessionUserId, sessionUserPassword)
}
main()