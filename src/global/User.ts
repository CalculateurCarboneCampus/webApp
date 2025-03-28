import type {api} from "@/global/api"
import router from "@/router"
import type {ICCCDataEntity, ICCProject} from "@/GlobalInterfaces"
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

  tempCurrentEditedProject: IUserEditedProject | null = null

  constructor() {
    return this
  }

  async connection(id: string, password: string) {
    this.id = id
    this.password = password

    this.reloadData().then(async () => {
      if(this.state.isConnected) {
        sessionStorage.setItem('sessionUserId', this.id)
        sessionStorage.setItem('sessionUserPassword', this.password)
        await router.push('/admin')
      }

      return this
    })
  }

  async sendNewUserAccount({newUserName, newUserMail, newUserPassword}: {
    newUserName: string
    newUserMail: string
    newUserPassword: string
  }): Promise<{
    status: 'success' | 'error',
    message: string,
  }> {
    const myHeaders = new Headers()

    // todo: API REQUEST
    // myHeaders.append("Cookie", "kirby_session=XXX");

    const formData = new FormData()
    formData.append("newUserName",      newUserName)
    formData.append("newUserMail",      newUserMail)
    formData.append("newUserPassword",  newUserPassword)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
    }

    return await (await fetch(apiUrl + "rest.user.create", requestOptions)).json()
  }

  public async reloadData() {

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

  async save(raw: {projectName: string | string[], value: IUserEditedProject}): Promise<{ error: string | null; success: boolean }> {

    try {
      const response = await fetch(apiUrl + "rest.user.save", {
        method: 'POST',
        body: JSON.stringify({
          userId: this.id,
          userPassword: this.password,
          ...raw,
        }),
        credentials: "same-origin",
      })

      return await response.json() as { 'error': string | null, success: boolean }
    } catch (e) {
      return {
        error: e as string,
        success: false,
      }
    }
  }

  async createNewProject(userEditedData: IUserEditedProject, projectName: string): Promise<{success: boolean, slugOfNewProject: string}> {
    if (this.tempCurrentEditedProject === null)
      this.tempCurrentEditedProject = {
        dataEntity: [],
        status: "draft",
        title: projectName,
        description: "Votre description est vide",
      }
    this.tempCurrentEditedProject.dataEntity = userEditedData.dataEntity.map(CCCDataEntity => {

      CCCDataEntity.entitySections = (CCCDataEntity as IUserEditedDataEntity).entitySections.map(CCCDataSection => {

        CCCDataSection.item = CCCDataSection.item.map(CCCDataItem => {
          CCCDataItem.yearLifeCycle = 1
          CCCDataItem.edited = false
          return CCCDataItem
        })
        return CCCDataSection

      })

      return CCCDataEntity as IUserEditedDataEntity
    })

    return new Promise<{success: boolean, slugOfNewProject: string}>(resolve => {
      this.save({
        projectName: projectName,
        value: this.tempCurrentEditedProject as IUserEditedProject,
      }).then(async response => {
        if(response.success) {
          await this.reloadData()
          resolve({
            slugOfNewProject: projectName,
            success: true,
          })
        } else {
          console.error("Oups, Failed to fetch")
          resolve({
            slugOfNewProject: projectName,
            success: false,
          })
        }
      })
    })
  }
}

export interface IUserEditedProject extends ICCProject {
  dataEntity: IUserEditedDataEntity[],
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
