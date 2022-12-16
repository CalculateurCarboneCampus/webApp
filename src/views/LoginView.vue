<template>
  <div class="v-login-view">
    <h2>Connection</h2>
    <h1>Identifiez-vous pour accéder à vos projets</h1>
    <p>ou créez <span>un compte -></span></p>

    <form class="v-login-view__form" >

      <input
          class="v-login-view__form__input"
          type="text"
          placeholder="adresse mail"
          name="mail"
          v-model="mail"
      >

      <fieldset
          class="v-login-view__form__fieldset"
      >
        <input
            class="v-login-view__form__input"
            :type="showPassword ? '' : 'password'"
            placeholder="mot de passe"
            name="password"
            v-model="password"
        >
        <button class="ccc-ui-button ccc-ui-button--alternate" type="button" @click="showPassword = !showPassword">afficher le mot de passe</button>
      </fieldset>

      <button class="ccc-ui-button" type="button" @click="sendDataConnection">connection</button>

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
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0;
    padding-bottom: 1rem;
  }

  .v-login-view__form {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 30rem;
    padding-top: 5rem;
  }

  .v-login-view__form__input {
    display: block;
    border: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: .8rem;
    line-height: 1rem;
    padding: .5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .v-login-view__form__fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
}
</style>
