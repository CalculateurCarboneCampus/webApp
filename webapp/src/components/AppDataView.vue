<template>
  <div class="v-app-data-view ccc-with-gutter-xl ccc-with-raw">
    <div
        class="v-app-data-view__section ccc-no-margin"
    >
      <div class="ccc-with-gutter ccc-no-margin">
        <h4
            class="v-app-data-view__section__title ccc-with-gutter"
        >{{ dataSection.name }}</h4>
      </div>

      <app-data-view-item
        v-for="(dataItem, ItemIndex) of dataSection.item"
        :index="ItemIndex"
        :parent-section-index="index"
      ></app-data-view-item>

      <div class="ccc-with-gutter">
        <button-add>Nouvelle entrée</button-add>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type { PropType } from 'vue'
import AppDataViewItem from "@/components/AppDataViewItem.vue"
import type {ICCCDataSection} from "@/GlobalInterfaces"
import ButtonAdd from "@/components/ButtonAdd.vue"
import {useDataStore} from "@/stores/dataStore"


export default defineComponent({
  components: {ButtonAdd, AppDataViewItem},

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  props: {
    index: {
      required: true,
      type:  Number,
    },
  },

  computed: {
    dataSection(): ICCCDataSection {
      const indexOfCurrentEntity = this.dataStore.CCCData
          .indexOf(this.dataStore.CCCData.filter( (value) => {
            return value.entityName === this.dataStore.currentEntityName
          })[0] || null)

      return this.dataStore.CCCData[indexOfCurrentEntity].entitySections[this.index]

    }
  }

})</script>

<style lang="scss">
.v-app-data-view {
  .v-app-data-view__section > * {
    margin-bottom: 1rem;
  }

  .v-app-data-view__section__title {
    height: var(--ccc-ui-size-unit);
    display: inline-block;
    line-height: var(--ccc-ui-size-unit);
    font-style: italic;
    border-top-right-radius:    var(--ccc-ui-size-unit);
    border-bottom-right-radius: var(--ccc-ui-size-unit);
    background-color: var(--ccc-color-white);
    box-shadow: var(--ccc-box-shadow);
    padding-right: var(--ccc-ui-size-unit);
  }
}
</style>
