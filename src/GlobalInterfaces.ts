export interface ICCProject {
  status: "draft" | "publish" | "delete" | "archive",
  title: string,
  description: string,
  dataEntity: ICCCDataEntity[],
}

export interface ICCCDataEntity {
  entityName: string
  entitySections: ICCCDataSection[]
  description: string
  hasLifeCycleOption: boolean
}

export interface ICCCDataSection {
  name: string
  description: string
  id: string
  item: ICCCDataItem[]
}

export interface ICCCDataItem {
  name: string
  donnes: number
  unit: string
  tco2e: number
  yearLifeCycle: number
  description: string
  srcfr: string
}
