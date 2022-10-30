<template>
  <div class="v-app-header ccc-with-gutter ccc-with-raw">
    <div
        class="ccc-with-gutter"
    ><img src="/logo.svg" alt="logo" class="v-app-header__logo"></div>

    <nav>
      <div class="ccc-with-gutter">
        <router-link
            to="/admin"
            class="v-app-header__link" >Mon éspace</router-link>
      </div>
      <div class="ccc-with-gutter">
        <a href="https://calculateurcarbonecampus.github.io/" target="_blank" class="v-app-header__link" >À propos</a>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

})</script>

<style lang="scss">
.v-app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
  }

  .v-app-header__logo {
    display: block;
    height: 6rem;
  }

  .v-app-header__link {
    display: block;
    text-decoration: none;
    color: var(--ccc-color-white);
    background: var(--ccc-color-dark);
    height: 2rem;
    line-height: 2rem;
    padding-left:   var(--ccc-ui-size-unit);
    padding-right:  var(--ccc-gutter-half);
    border-top-left-radius:     var(--ccc-ui-size-unit);
    border-bottom-left-radius:  var(--ccc-ui-size-unit);

  }
}
</style>
