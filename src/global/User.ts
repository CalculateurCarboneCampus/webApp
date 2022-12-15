import type {api} from "@/global/api"
import router from "@/router"
import type {ICCCDataEntity} from "@/GlobalInterfaces"
import type {ICCCDataItem, ICCCDataSection} from "@/GlobalInterfaces"
import {apiUrl} from "@/main";

export class User {

  private state: api.userData = {
    isConnected: false,
    error: null as string | null,
    projects: {},
    email: null,
    username: null,
    userID: null
  }

  private id = ""
  private password = ""

  tempCurrentEditedProject: IUserEditedDataEntity[] | null = null

  constructor() {
    return this
  }

  async connection(id: string, password: string) {
    this.id = id
    this.password = password

    this.reloadData().then(async () => {
      if(this.state.isConnected) await router.push('/admin')

      return this
    })
  }

  public async reloadData() {

      console.log("reloadData")
      const myHeaders = new Headers()
      // todo: cookie session
      // myHeaders.append("Cookie", "kirby_session=")

      const raw = JSON.stringify({
        userId: this.id,
        userPassword: this.password,
      })

      const response = await fetch(apiUrl + "rest.user.data", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: "same-origin",
      })

      this.state = await response.json() as api.userData

      return this
  }

  public get isConnected() {return this.state.isConnected}

  public get isNotConnected() {return ! this.state.isConnected}

  public get listOfProjects() {return this.state.projects}

  public get userID() {return this.state.userID}

  public get username() {return this.state.username}

  public set error(value: string | null) {this.state.error}
  public get error(): string | null {return this.state.error}

  async save(raw: {projectName: string | string[], value: string}) {

    const response = await fetch(apiUrl + "rest.user.save", {
      method: 'POST',
      body: JSON.stringify({
        userId: this.id,
        userPassword: this.password,
        ...raw,
      }),
      credentials: "same-origin",
    })

    // debugger

    return await response.json() as { 'error': string | null, success: boolean }
  }

  async createNewProject(userEditedData: ICCCDataEntity[], projectName: string) {

    this.tempCurrentEditedProject = userEditedData.map(CCCDataEntity => {

      CCCDataEntity.entitySections = (CCCDataEntity as IUserEditedDataEntity).entitySections.map(CCCDataSection => {

        CCCDataSection.item = CCCDataSection.item.map(CCCDataItem => {
          // todo: set edited status to false by default
          CCCDataItem.edited = true
          return CCCDataItem
        })
        return CCCDataSection

      })

      return CCCDataEntity as IUserEditedDataEntity
    })

    return new Promise<User>(resolve => {
      this.save({
        projectName: projectName,
        value: JSON.stringify(this.tempCurrentEditedProject as IUserEditedDataEntity[]),
      }).then(async response => {
        if(response.success) {
          resolve(await this.reloadData())
        } else {
          resolve(this)
        }
      })
    })
  }
}

export interface IUserEditedDataEntity extends ICCCDataEntity {
  entitySections: IUserEditedDataSection[]
}

export interface IUserEditedDataSection extends ICCCDataSection {
  item: IUserEditedDataItem[]
}

export interface IUserEditedDataItem extends ICCCDataItem {
  edited: boolean
}
