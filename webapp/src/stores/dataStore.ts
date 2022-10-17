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
    totalValue(state): number {
      if(state.user.tempCurrentEditedProject === null) return 0

      return state.user.tempCurrentEditedProject.map( entityValue => {
        return entityValue.entitySections.map( sectionValue => {
          return sectionValue.item.map( itemValue => {
            if(itemValue.edited)  return itemValue.donnes * itemValue.tco2e
            else return 0
          }).reduce( (previousValue, currentValue) => { return previousValue + currentValue }, 0 )
        }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
      }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
    }

  },

  actions: {
    // todo: ok
    setCCCData(CCCData: ICCCDataEntity[]) {
      // this.currentEntityName = CCCData[0]?.entityName
      this.CCCData = CCCData
    },

    setCurrentEntiryName(value: string) {
      this.currentEntityName = value
    }
  },
})
