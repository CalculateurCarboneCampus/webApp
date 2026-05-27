import {defineStore} from "pinia";

export const useDataModalMsg = defineStore('useDataModalMsg', {
  state: () => ({
    msg: null
  }),
})
