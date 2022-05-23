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

window.setTimeout(async () => {
  // useDataStore().setCCCData([
  //   {
  //     entityName: "Bâtiment",
  //     description: "",
  //     entitySections: [
  //       {
  //         name: "Consomation d'energie chauffage",
  //         item: [
  //           {
  //             name: "Gaz europe",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 0.006,
  //           }
  //         ]
  //       },
  //       {
  //         name: "Consomation d'electricité",
  //         item: [
  //           {
  //             name: "Moyenne suisse",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 3.640,
  //           }
  //         ]
  //       },
  //     ],
  //   },
  //   {
  //     entityName: "Achats",
  //     description: "",
  //     entitySections: [
  //       {
  //         name: "Consomation d'energie chauffage",
  //         item: [
  //           {
  //             name: "Gaz europe",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 0.006,
  //           }
  //         ]
  //       },
  //       {
  //         name: "Consomation d'electricité",
  //         item: [
  //           {
  //             name: "Moyenne suisse",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 3.640,
  //           }
  //         ]
  //       },
  //     ]
  //   },
  //   {
  //     entityName: "Mobilité",
  //     description: "",
  //     entitySections: [
  //       {
  //         name: "Consomation d'energie chauffage",
  //         item: [
  //           {
  //             name: "Gaz europe",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 0.006,
  //           }
  //         ]
  //       },
  //       {
  //         name: "Consomation d'electricité",
  //         item: [
  //           {
  //             name: "Moyenne suisse",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 3.640,
  //           }
  //         ]
  //       },
  //     ]
  //   },
  //   {
  //     entityName: "Fret",
  //     description: "",
  //     entitySections: [
  //       {
  //         name: "Consomation d'energie chauffage",
  //         item: [
  //           {
  //             name: "Gaz europe",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 0.006,
  //           }
  //         ]
  //       },
  //       {
  //         name: "Consomation d'electricité",
  //         item: [
  //           {
  //             name: "Moyenne suisse",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 3.640,
  //           }
  //         ]
  //       },
  //     ]
  //   },
  //   {
  //     entityName: "Déchêts",
  //     description: "",
  //     entitySections: [
  //       {
  //         name: "Consomation d'electricité",
  //         item: [
  //           {
  //             name: "Moyenne suisse",
  //             donnes: 0,
  //             unit: 'KW/h',
  //             tco2e: 3.640,
  //           }
  //         ]
  //       },
  //     ]
  //   },
  // ])

  const response = await window.fetch('http://localhost:8000/', {})

  useDataStore().setCCCData(await response.json())
}, 0)
