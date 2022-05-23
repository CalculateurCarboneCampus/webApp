<template>
  <div class="v-app-footer ccc-with-raw">
    <div class="ccc-with-gutter">
      Initié par:
    </div>

    <div class="ccc-with-gutter">
      <img
          class="v-app-footer__logo"
          alt="logo hesso"
          src="/logo-hesso.svg"
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

  > * {
    display: block;
  }

  .v-app-footer__logo {
    height: 3rem;
  }
}
</style>
