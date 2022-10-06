import type {api} from "@/global/api"
import router from "@/router"

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

  constructor() {
    return this
  }

  async connection(id: string, password: string) {
    this.id = id
    this.password = password

    const myHeaders = new Headers()
    // todo: cookie session
    // myHeaders.append("Cookie", "kirby_session=")

    const raw = JSON.stringify({
      userId: this.id,
      userPassword: this.password,
    })

    const response = await fetch("http://localhost:8000/rest.user.data", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      credentials: "same-origin",
    })

    this.state = await response.json() as api.userData

    if(this.state.isConnected) await router.push('/admin')

    return this
  }

  public get isConnected() {return this.state.isConnected}

  public get isNotConnected() {return ! this.state.isConnected}

  public get listOfProjects() {return this.state.projects}

  public get userID() {return this.state.userID}

  private static async getDataFromApi() {
    return await (await window.fetch('http://localhost:8000/rest.public.data', {})).json() as {
      isConnected: boolean,
      error: string | null,
      projects: [] | null,
    }
  }

  async save(raw: {projectName: string | string[], value: object}) {

    console.log("hello")

    const response = await fetch("http://localhost:8000/rest.user.save", {
      method: 'POST',
      body: JSON.stringify({
        userId: this.id,
        userPassword: this.password,
        ...raw,
      }),
      credentials: "same-origin",
    })

    console.log(await response.json())

    return this
  }
}
