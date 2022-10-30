<template>
  <div class="v-app-navigation">
    <div class="v-app-navigation__start"></div>
    <div class="v-app-navigation__line"></div>

    <template
        v-for="name of allCCCDataNames"
    >
      <app-nav-item :name="name"></app-nav-item>
      <div class="v-app-navigation__line"></div>
    </template>

    <app-nav-item name="Résultat" :variant-style="true" ></app-nav-item>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppNavItem from "@/components/AppNavItem.vue"
import {useDataStore} from "@/stores/dataStore"

export default defineComponent({
  components: {AppNavItem},

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  computed: {
    allCCCDataNames(): string[] {
      return this.dataStore.user.tempCurrentEditedProject?.map( value => {
        return value.entityName
      }) || []
    }
  },
})</script>

<style lang="scss">
.v-app-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;

  .v-app-navigation__start {
    background: var(--ccc-color-dark);
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }

  .v-app-navigation__line {
    width: 2px;
    height: 1rem;
    background: var(--ccc-color-dark);
  }

}
</style>
