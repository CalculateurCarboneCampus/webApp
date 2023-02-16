<template>
  <div class="v-login-view">
    <h2>Connexion</h2>
    <h1>Identifiez-vous pour accéder à vos projets</h1>
    <p
        style="text-decoration: underline; user-select: none; cursor: pointer"
        @click="showCreateUserInterface = true"
    >ou créez un compte -></p>

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

      <button class="ccc-ui-button" type="button" @click="sendDataConnection">connexion</button>

    </form>

    <div
        v-if="showCreateUserInterface"
        class="v-login-view__create-user"
    >
      <div
          class="v-login-view__create-user__cache"
          @click.stop="closeCreateUserPanel"
      ></div>
      <form>
        <input
            class="v-login-view__form__input"
            type="text"
            placeholder="nom"
            name="newUserName"
            v-model="newUserName"
        >

        <input
            class="v-login-view__form__input"
            type="text"
            placeholder="adresse mail"
            name="newUserMail"
            v-model="newUserMail"
        >

        <fieldset
            class="v-login-view__form__fieldset"
        >
          <input
              class="v-login-view__form__input"
              :type="showNewUserPassword ? '' : 'password'"
              placeholder="mot de passe"
              name="newUserPassword"
                v-model="newUserPassword"
          >
          <button class="ccc-ui-button ccc-ui-button--alternate" type="button" @click="showNewUserPassword = !showNewUserPassword">afficher le mot de passe</button>
        </fieldset>

        <div
            class="v-login-view__create-user__message"
            v-if="requestResponseCreateUserSate"
        >
          <p>{{requestResponseCreateUserSate.message}}</p>
        </div>

        <button
            v-if="requestResponseCreateUserSate && requestResponseCreateUserSate.status === 'success'"
            class="ccc-ui-button" type="button" @click="closeCreateUserPanel"
        >se connecter -></button>

        <button class="ccc-ui-button" type="button" @click="createNewCount"
                v-else
        >créer le compte</button>

      </form>
    </div>
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
      showCreateUserInterface: false,

      newUserName: '',
      newUserMail: '',
      newUserPassword: '',
      showNewUserPassword: false,

      requestResponseCreateUserSate: null as null | {
        status: 'success' | 'error',
        message: string,
      }
    }
  },

  methods: {
    sendDataConnection() {
      this.dataStore.$state.user.connection(this.mail, this.password)
    },

    closeCreateUserPanel() {
      this.showCreateUserInterface = false
      this.requestResponseCreateUserSate = null
    },

    async createNewCount() {
      this.requestResponseCreateUserSate = await this.dataStore.$state.user.sendNewUserAccount({
        newUserName: this.newUserName,
        newUserMail: this.newUserMail,
        newUserPassword: this.newUserPassword,
      })

      if( this.requestResponseCreateUserSate.status === 'success' ) {
        this.mail = this.newUserMail
        this.password = this.newUserPassword
      }
    },
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

.v-login-view__create-user {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  > form {
    position: absolute;
    background: var(--ccc-color-main);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    width: 20rem;
    box-shadow: var(--ccc-box-shadow);

    > input + input {
      margin-top: 1rem;
    }

    > button {
      display: block;
      margin: auto;
    }

  }

  .v-login-view__create-user__cache {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .75);
  }
}
</style>
