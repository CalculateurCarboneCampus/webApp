<template>
  <div class="v-app-footer">
    <div>
      Initié par:
    </div>

    <img
        class="v-app-footer__logo"
        alt="logo hesso"
        src="/logo--hesso.png"
    >
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

  > * {
    display: block;
  }

  .v-app-footer__logo {
    height: 3rem;
  }
}
</style>
