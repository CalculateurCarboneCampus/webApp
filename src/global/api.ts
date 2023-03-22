export namespace api {
  export interface userData {
    email: string | null
    error: string | null
    isConnected: boolean
    username: string | null
    projects: { [key: string] : project}
    userID: string | null
  }

  export interface project {
    parent:  string
    slug:    string
    uid:     string
    content: projectContent
  }

  export interface projectContent {
    content: StringOfIUserEditedProject
    userid:  string
  }

  export type StringOfIUserEditedProject = string
}
