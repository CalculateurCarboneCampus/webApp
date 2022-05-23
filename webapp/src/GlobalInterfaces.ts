export interface ICCCDataEntity {
  entityName: string
  entitySections: ICCCDataSection[]
  description: string
}

export interface ICCCDataSection {
  name: string
  item: ICCCDataItem[]
}

export interface ICCCDataItem {
  name: string
  value: number
  valueUnit: string
  tco2e: number
}
