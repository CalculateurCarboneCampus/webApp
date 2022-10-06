<template>
  <div class="v-project-draft-view">
    <h1>projet en cour d'édition</h1>
    <h2>{{$route.params.userID}}</h2>
    <h2>{{$route.params.projectSlug}}</h2>

    <p v-if="project">{{project.content.content}}</p>

    <form
        onsubmit="return false"
    >
      <input type="text" v-model="textValue">
      <button type="button" @click="save">enregistrer</button>
    </form>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"

export default defineComponent({

  data() {
    return {
      textValue: "",
      dataStore: useDataStore()
    }
  },

  computed: {
    project(): api.project | null {
      return Object.values(this.dataStore.user.listOfProjects).find(value => {
        return value.slug === this.$route.params.projectSlug
      }) || null
    }
  },

  methods: {
    save() {
      this.dataStore.$state.user.save({
        value: {value: this.textValue},
        projectName: this.$route.params.projectSlug,
      })
    }
  },

})</script>

<style lang="scss">
.v-project-draft-view {
}
</style>
