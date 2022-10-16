<template>
  <div class="v-admin-view ccc-with-gutter">
    <h1 class="ccc-with-gutter">Mon éspace: {{dataStore.user.username}}</h1>

    <div
        class="v-admin-view__projects"
    >
      <div
          class="v-admin-view__projects__item ccc-with-gutter"
          v-for="project of projects"
      >
        <div
            class="v-admin-view__projects__item__slug"
        >{{project.slug}}</div>
        <router-link
            class="ccc-ui-button--small v-admin-view__projects__item__button"
            :to="{name: 'admin.project', params: {userID: user.userID, projectSlug: project.slug}}"
        >edit -></router-link>
      </div>
      <div
          class="v-admin-view__add-calculation"
      >
        <div class="ccc-ui-circle" @click="addCalculation">+</div>
        <div>Nouveau Calcul</div>
        <input type="text" v-model="newProjectName">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"
import type {User} from "@/global/User"
import type {IUserEditedDataEntity} from "@/global/User"

export default defineComponent({

  data() {
    return {
      dataStore: useDataStore(),
      newProjectName: '',
    }
  },

  computed: {
    user(): User {
      return this.dataStore.$state.user as User
    },

    projects(): { [key: string] : api.project} {
      return this.dataStore.$state.user.listOfProjects
    }
  },

  methods: {
    addCalculation(): void {
      this.dataStore.user.createNewProject(this.dataStore.CCCData, this.newProjectName)
    },
  },

})</script>

<style lang="scss">
.v-admin-view {
  .v-admin-view__projects {
  }

  .v-admin-view__add-calculation {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;
    transition: background-color .25s ease-in-out;

    > * {
      transition: transform .5s ease-in-out;
    }

    input {
      opacity: 0;
      transition: opacity .5s ease-in-out;
    }

    &:hover {
      background: var(--ccc-color-main);

      div {
        transform: translate(0, -1rem);
      }

      input {
        opacity: 1;
      }

      .ccc-ui-circle {
        transform: translate(0, -2rem);
      }
    }
  }

  .v-admin-view__projects__item__button {
    background-color: var(--ccc-color-dark);
    color: var(--ccc-color-white);
    padding: .5rem;
  }

  .v-admin-view__projects__item {
    padding:    1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: var(--ccc-color-main);
      border-radius: 1rem;
    }

    > * {
      display: block;
    }
  }
}
</style>
