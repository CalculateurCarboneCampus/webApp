import { defineStore } from 'pinia'
import type {ICCCDataEntity, ICCCDataSection} from "@/GlobalInterfaces"
import {User} from "@/global/User"

export const useDataStore = defineStore({
  id: 'dataStore',

  state: () => ({
    CCCData: [] as ICCCDataEntity[],
    currentEntityName: "",
    user: new User(),
  }),

  getters: {
  },

  actions: {
    setCCCData(CCCData: ICCCDataEntity[]) {
      this.currentEntityName = CCCData[0]?.entityName
      this.CCCData = CCCData
    }
  },
})
