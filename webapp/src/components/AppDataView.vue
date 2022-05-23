<template>
  <div class="v-app-data-view ccc-with-gutter-xl ccc-with-raw">
    <div
        class="v-app-data-view__section ccc-no-margin"
    >
      <div class="ccc-with-gutter ccc-no-margin">
        <h4
            class="v-app-data-view__section__title ccc-with-gutter"
        >{{ dataViewProp.name }}</h4>
      </div>

      <app-data-view-item
        v-for="dataItem of dataViewProp.item"
        :data="dataItem"
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
  props: {
    dataViewProp: {
      required: true,
      type: Object as PropType<ICCCDataSection>,
    },
  },
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
