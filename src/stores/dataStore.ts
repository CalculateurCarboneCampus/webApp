import { defineStore } from 'pinia'
import type {ICCProject, ICCCDataEntity, ICCCDataSection} from "@/GlobalInterfaces"
import {User} from "@/global/User"

type DivisionMarkName = "coffee" | "smartphone" | "airplane" | "resident"

export interface IDivisionMark {
  sentence:     string,
  unitValue:    number,
  maxUnitMark:  number,
  name: DivisionMarkName,
}


export const useDataStore = defineStore({
  id: 'dataStore',

  state: () => ({
    CCCData: {
      dataEntity: [],
      status: "draft",
      title: "",
      description: "",
    } as ICCProject,
    currentEntityName: "",
    user: new User(),
    dataHasChange: false,
    waitForSavingData: false,
    divisionMark: {
      resident: {
        sentence: "année(s) de vie d'une personne résident à Genève",
        unitValue:    10,
        maxUnitMark:  10_000_000_000,
        name: 'resident',
      } as IDivisionMark,
      airplane: {
        sentence: "aller-retour Genève<->Londre en\xa0avion",
        unitValue:    0.357,
        maxUnitMark:  28,
        name: 'airplane',
      } as IDivisionMark,
      smartphone: {
        sentence: "production de smartphone",
        unitValue:    0.016,
        maxUnitMark:  23,
        name: 'smartphone',
      } as IDivisionMark,
      coffee: {
        sentence: "café(s)",
        unitValue:    0.000127,
        maxUnitMark:  126,
        name: 'coffee',
      } as IDivisionMark,
    },
  }),

  getters: {
    totalValue(state): number {
      if(state.user.tempCurrentEditedProject === null) return 0

      return state.user.tempCurrentEditedProject.dataEntity.map( entityValue => {
        return entityValue.entitySections.map( sectionValue => {
          return sectionValue.item.map( itemValue => {
            if(itemValue.edited)  return itemValue.donnes * itemValue.tco2e / 1_000 / itemValue.yearLifeCycle
            else return 0
          }).reduce( (previousValue, currentValue) => { return previousValue + currentValue }, 0 )
        }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
      }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
    },

    valueEquivalent(): IDivisionMark | null
    {

      if(this.totalValue === 0) return null

      if(this.totalValue < this.divisionMark.coffee.maxUnitMark     * this.divisionMark.coffee.unitValue)
        return this.divisionMark.coffee

      if(this.totalValue < this.divisionMark.smartphone.maxUnitMark * this.divisionMark.smartphone.unitValue)
        return this.divisionMark.smartphone

      if(this.totalValue < this.divisionMark.airplane.maxUnitMark   * this.divisionMark.airplane.unitValue)
        return this.divisionMark.airplane

      return this.divisionMark.resident
    }

  },

  actions: {
    setCCCData(iccProject: ICCCDataEntity[]) {
      console.log( iccProject )
      this.currentEntityName = iccProject[0]?.entityName
      this.CCCData = {
        status: "draft",
        dataEntity: iccProject,
        title: "",
        description: "",
      }
    },

    setCurrentEntiryName(value: string) {
      this.currentEntityName = value
    },

    getTotalValueOfEntity(entityName: string): number {

      if(this.user.tempCurrentEditedProject === null) return 0

      let totalEntityValue = 0

      this.user.tempCurrentEditedProject.dataEntity.find(entity => {
        return entity.entityName === entityName
      })?.entitySections.map(section => {
        section.item.map(sectionItem => {
          if( sectionItem.edited ) totalEntityValue += sectionItem.donnes * sectionItem.tco2e / 1_000
        })
      })

      return totalEntityValue
    }
  },
})
