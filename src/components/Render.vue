<template>
  <div class="v-render">
    <div class="v-render__header ccc-with-gutter ccc-no-margin ccc-with-raw">
      <h4>Émission de CO2 du projet</h4>
    </div>

    <div class="v-render__body ccc-with-gutter ccc-no-margin ccc-with-raw">

      <p class="v-render__result-value">{{totalValue.toFixed(2).replace('.', ',')}} tCO2e</p>

      <div
          class="v-render__icon"
      >
        <template
            v-if="dataStore.valueEquivalent"
        >
          <transition-group
              name="horizontal"
          >
            <img
                v-if="dataStore.valueEquivalent.name === 'coffee'"
                alt="render icon fly"
                src="../assets/cafe.svg"
            >
            <img
                v-else-if="dataStore.valueEquivalent.name === 'smartphone'"
                alt="render icon fly"
                src="../assets/fabrication_smartphone.svg"
            >
            <img
                v-else-if="dataStore.valueEquivalent.name === 'airplane'"
                alt="render icon fly"
                src="../assets/avion.svg"
            >
            <img
                v-else-if="dataStore.valueEquivalent.name === 'resident'"
                alt="render icon fly"
                src="../assets/suisse.svg"
            >
          </transition-group>
        </template>
      </div>
    </div>

    <div
        class="v-render__footer ccc-with-gutter ccc-no-margin ccc-with-raw"
        v-if="dataStore.valueEquivalent"
    >
      <p>
        <i>
          {{totalValue}} tonnes de CO2 émis
          <br>correspond à environs
          <br><strong>{{Math.round( totalValue / dataStore.valueEquivalent.unitValue )}} {{dataStore.valueEquivalent.sentence}}</strong>
        </i>
      </p>

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
      flyValue: 1, // tones
    }
  },

  computed: {
    totalValue(): number {
      return this.dataStore.totalValue
    }
  }

})</script>

<style lang="scss">
.v-render {
  margin-right: var(--ccc-gutter-half);
  width: 20rem;

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

  .v-render__icon {
    width: 100%;
    height: 10rem;
    position: relative;

    img {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      top: 0;
      left: 0;
    }
  }
}
</style>
