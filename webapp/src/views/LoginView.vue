<template>
  <div class="v-login-view">
    <h1>connection</h1>

    <form>

      <input
          type="text"
          placeholder="adresse mail"
          name="mail"
          v-model="mail"
      >

      <fieldset>
        <input
            :type="showPassword ? '' : 'password'"
            placeholder="mot de passe"
            name="password"
            v-model="password"
        >
        <button type="button" @click="showPassword = !showPassword">afficher le mot de passe</button>
      </fieldset>

      <button type="button" @click="sendDataConnection">connection</button>

    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"

export default defineComponent({

  data() {
    return {
      password: '',
      mail: '',
      dataStore: useDataStore(),
      showPassword: false,
    }
  },

  methods: {
    sendDataConnection() {
      this.dataStore.$state.user.connection(this.mail, this.password)
    }
  }

})</script>

<style lang="scss">
.v-login-view {
}
</style>
