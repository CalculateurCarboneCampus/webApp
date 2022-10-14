<template>
  <div class="v-render">
    <div class="v-render__header ccc-with-gutter ccc-no-margin ccc-with-raw">
      <h4>Émission de CO2 du projet</h4>
    </div>

    <div class="v-render__body ccc-with-gutter ccc-no-margin ccc-with-raw">

      <p class="v-render__result-value">{{totalValue}} tCO2e</p>

      <img
          v-if="totalValue < coffeeLimit"
          alt="render icon fly"
          src="../assets/cafe.svg"
      >
      <img
          v-else
          alt="render icon fly"
          src="../assets/avion.svg"
      >
    </div>

    <div class="v-render__footer ccc-with-gutter ccc-no-margin ccc-with-raw">
      <p
          v-if="totalValue < coffeeLimit"
      ><i>{{totalValue}} tonnes de CO2 émis correspond à faire environs <strong>{{Math.round( totalValue / coffeeValue )}} cafés</strong></i></p>

      <p
          v-else
      ><i>{{totalValue}} tonnes de CO2 émis correspond à faire environs <strong>{{Math.round( totalValue / flyValue )}} allers retours Genève Londres en avion</strong></i></p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"

export default defineComponent({

  data() {
    return {
      dataStore: useDataStore(),
      coffeeValue: 0.005, // tones
      coffeeLimit: 1, // tones
      phoneValue: 0.1,
      phoneLimit: .5,
      flyValue: 1, // tones
    }
  },

  computed: {
    totalValue(): any {
      if(this.dataStore.user.tempCurrentEditedProject === null) return 0

      return this.dataStore.user.tempCurrentEditedProject.map( entityValue => {
        return entityValue.entitySections.map( sectionValue => {
          return sectionValue.item.map( itemValue => {
            return itemValue.donnes * itemValue.tco2e
          }).reduce( (previousValue, currentValue) => { return previousValue + currentValue }, 0 )
        }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
      }).reduce( (previousValue, currentValue) => { return previousValue + currentValue } )
    }
  }

})</script>

<style lang="scss">
.v-render {
  margin-right: var(--ccc-gutter-half);
  max-width: 20rem;

  .v-render__header {
    display: inline-block;
    background: var(--ccc-color-alternate);
    box-shadow: var(--ccc-box-shadow);
    position: relative;
    z-index: 0;
    margin-right: 2rem;

    > * {
      display: inline-block;
    }
  }

  .v-render__body {
    background: var(--ccc-color-alternate);
    box-shadow: var(--ccc-box-shadow);
    position: relative;
    z-index: 0;
  }

  .v-render__footer {
    background: var(--ccc-color-alternate);
    box-shadow: var(--ccc-box-shadow);
    position: relative;
    z-index: 0;
  }

  .v-render__result-value {
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 600;
    text-align: center;
  }

  img {
    display: block;
    width: 100%;
    max-height: 10rem;
    margin: auto;
  }
}
</style>
