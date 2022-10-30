<template>
  <div class="v-home-view ccc-with-gutter ccc-with-raw">

    <div class="ccc-with-gutter">
      <app-navigation></app-navigation>
    </div>

    <template
        v-if="dataStore.currentEntityName !== 'Résultat'"
    >
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

  computed: {}

})</script>

<style lang="scss">

</style>
