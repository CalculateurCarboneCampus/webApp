<template>
  <div class="v-project-draft-view">
    <div class="ccc-with-gutter">
      <app-navigation></app-navigation>
    </div>

    <template
        v-if="dataStore.currentEntityName !== 'Résultat'"
    >
      <div class="v-project-draft-view__data-container ccc-with-gutter">
        <div class="v-project-draft-view__data-container__header">
          <h1 class="v-project-draft-view__project-title">{{$route.params.projectSlug}}</h1>
          <button class="ccc-ui-button" type="button" @click="save">Enregistrer</button>
        </div>
        <section
            class="v-section-data ccc-with-raw"
        >
          <app-data-view
              v-for="(data, index) of dataSection"
              :index="index"
          ></app-data-view>
        </section>
      </div>

      <div class="ccc-with-gutter">
        <section
            class="v-result-viewer"
        >
          <render></render>
        </section>
      </div>
    </template>

    <template v-else>
      <div class="ccc-with-gutter ccc-with-raw">
        <div
            class="v-result-print"
        ></div>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"
import type {ICCCDataSection} from "@/GlobalInterfaces"
import AppNavigation from "@/components/AppNavigation.vue"
import Render from "@/components/Render.vue"
import AppDataView from "@/components/AppDataView.vue"

export default defineComponent({
  components: {Render, AppNavigation, AppDataView},
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
    },

    dataSection(): ICCCDataSection[] {
      return this.dataStore.CCCData.filter( (value) => {
        return value.entityName === this.dataStore.currentEntityName
      })[0]?.entitySections
    },
  },

  methods: {
    save() {
      this.dataStore.user.save({
        value: {value: this.textValue},
        projectName: this.$route.params.projectSlug,
      }).then(response => {
        console.log(response.error)
        if( response.success ) this.dataStore.user.reloadData()
        else this.dataStore.user.error = response.error
      })
    }
  },

})</script>

<style lang="scss">
.v-project-draft-view {
  display: flex;

  .v-section-data {
    background-color: var(--ccc-color-main);
    border-radius: var(--ccc-ui-size-unit);
    box-shadow: var(--ccc-box-shadow);
    margin-right: var(--ccc-gutter-half);
  }

  .v-project-draft-view__project-title {
    margin: 0;
  }

  .v-project-draft-view__data-container {
    flex-grow: 1;
  }

  .v-project-draft-view__data-container__header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
    flex-direction: row;
  }

  .v-result-print {
    width: 21cm;
    height: 29.7cm;
    background-color: white;
    transform: scale(.8);
    transform-origin: top left;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
