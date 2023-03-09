export interface ICCProject {
  status: "draft",
  title: string,
  description: string,
  dataEntity: ICCCDataEntity[],
}

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
  donnes: number
  unit: string
  tco2e: number
}
