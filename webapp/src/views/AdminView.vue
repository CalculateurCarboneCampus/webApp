<template>
  <div class="v-admin-view ccc-with-gutter">
    <h1 class="ccc-with-gutter">Mon éspace</h1>

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
            class="ccc-ui-button"
            :to="{name: 'admin.project', params: {userID: user.userID, projectSlug: project.slug}}"
        >edit -></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"
import type {User} from "@/global/User"

export default defineComponent({

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  computed: {
    user(): User {
      return this.dataStore.$state.user
    },

    projects(): api.project[] {
      return this.dataStore.$state.user.listOfProjects
    }
  },

})</script>

<style lang="scss">
.v-admin-view {
  .v-admin-view__projects {
  }

  .v-admin-view__projects__item {
    padding-top:    calc( var(--ccc-unit) / 2 );
    padding-bottom: calc( var(--ccc-unit) / 2 );
    display: flex;
    align-items: center;
    justify-content: space-between;

    > * {
      display: block;
    }
  }
}
</style>
