<template>
  <div class="v-render">
    <div class="v-render__header ccc-with-gutter ccc-no-margin ccc-with-raw">
      <h4>Émission de CO2 du projet</h4>
    </div>

    <div class="v-render__body ccc-with-gutter ccc-no-margin ccc-with-raw">

      <p class="v-render__result-value">3,646 tCO2e</p>

      <img
          alt="render icon fly"
          src="../assets/avion.svg"
      >
    </div>

    <div class="v-render__footer ccc-with-gutter ccc-no-margin ccc-with-raw">
      <p><i>3,646 tonnes de CO2 émis correspond à faire <strong>10 allers retours Genève Londres en avion</strong></i></p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({



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
