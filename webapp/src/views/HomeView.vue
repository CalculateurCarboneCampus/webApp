<template>
  <div class="v-home-view ccc-with-gutter ccc-with-raw">

    <div class="ccc-with-gutter">
      <app-navigation></app-navigation>
    </div>


    <div class="v-home-view__data-container ccc-with-gutter">
      <h1 class="v-home-view__project-title">Titre projet</h1>
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

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppDataView from "@/components/AppDataView.vue"
import type {ICCCDataSection} from "@/GlobalInterfaces"
import AppNavigation from "@/components/AppNavigation.vue"
import {useDataStore} from "@/stores/dataStore"
import Render from "@/components/Render.vue"

export default defineComponent({
  components: {Render, AppNavigation, AppDataView},
  props: {
  },

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  computed: {
    dataSection(): ICCCDataSection[] {
      return this.dataStore.CCCData.filter( (value) => {
        return value.entityName === this.dataStore.currentEntityName
      })[0]?.entitySections
    }
  }

})</script>

<style lang="scss">
.v-home-view {
  display: flex;

  .v-section-data {
    background-color: var(--ccc-color-main);
    border-radius: var(--ccc-ui-size-unit);
    box-shadow: var(--ccc-box-shadow);
    margin-right: var(--ccc-gutter-half);
  }

  .v-home-view__project-title {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .v-home-view__data-container {
    flex-grow: 1;
  }
}

</style>
