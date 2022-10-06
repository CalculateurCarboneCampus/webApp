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
    content: {
      content: string
      status:  string
      userid:  string
    }
  }
}
