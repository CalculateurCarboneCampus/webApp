import { defineStore } from 'pinia'
import type {ICCCDataEntity, ICCCDataSection} from "@/GlobalInterfaces"

export const useDataStore = defineStore({
  id: 'dataStore',

  state: () => ({
    CCCData: [] as ICCCDataEntity[],
    currentEntityName: "",
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
