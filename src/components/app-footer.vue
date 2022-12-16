<template>
  <div class="v-app-footer ccc-with-raw">
    <div class="ccc-with-gutter">
      Soutenu par
    </div>

    <div class="ccc-with-gutter-xl">
      <img
          class="v-app-footer__logo"
          alt="logo hes-ge"
          src="../assets/logo_heg-ge.svg"
      >
    </div>

    <div class="ccc-with-gutter-xl">
      <img
          class="v-app-footer__logo"
          alt="logo head"
          src="/logo-head.png"
      >
    </div>
    <div class="ccc-with-gutter-xl">
      <img
          style="height: 2.5rem"
          class="v-app-footer__logo"
          alt="logo hesso"
          src="/logo-hesso-geneve.png"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

})</script>

<style lang="scss">
.v-app-footer {
  display: flex;
  justify-content: center;
  align-items: center;

  .v-app-footer__logo {
    height: 3rem;
    display: block;
  }
}
</style>
