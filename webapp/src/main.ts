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

window.setTimeout(() => {
  useDataStore().setCCCData([
    {
      entityName: "Bâtiment",
      entitySections: [
        {
          name: "Consomation d'energie chauffage",
          item: [
            {
              name: "Gaz europe",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 0.006,
            }
          ]
        },
        {
          name: "Consomation d'electricité",
          item: [
            {
              name: "Moyenne suisse",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 3.640,
            }
          ]
        },
      ],
    },
    {
      entityName: "Achats",
      entitySections: [
        {
          name: "Consomation d'energie chauffage",
          item: [
            {
              name: "Gaz europe",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 0.006,
            }
          ]
        },
        {
          name: "Consomation d'electricité",
          item: [
            {
              name: "Moyenne suisse",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 3.640,
            }
          ]
        },
      ]
    },
    {
      entityName: "Mobilité",
      entitySections: [
        {
          name: "Consomation d'energie chauffage",
          item: [
            {
              name: "Gaz europe",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 0.006,
            }
          ]
        },
        {
          name: "Consomation d'electricité",
          item: [
            {
              name: "Moyenne suisse",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 3.640,
            }
          ]
        },
      ]
    },
    {
      entityName: "Fret",
      entitySections: [
        {
          name: "Consomation d'energie chauffage",
          item: [
            {
              name: "Gaz europe",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 0.006,
            }
          ]
        },
        {
          name: "Consomation d'electricité",
          item: [
            {
              name: "Moyenne suisse",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 3.640,
            }
          ]
        },
      ]
    },
    {
      entityName: "Déchêts",
      entitySections: [
        {
          name: "Consomation d'electricité",
          item: [
            {
              name: "Moyenne suisse",
              value: 0,
              valueUnit: 'KW/h',
              tco2e: 3.640,
            }
          ]
        },
      ]
    },
  ])
}, 3000)
