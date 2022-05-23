<template>
  <div class="v-app">

    <app-header></app-header>

    <router-view></router-view>

    <app-footer></app-footer>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppNavigation from "@/components/AppNavigation.vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/app-footer.vue"

export default defineComponent({
  components: {AppFooter, AppHeader, AppNavigation},
  props: {
  },

})</script>

<style lang="scss">
.v-app {
}
</style>
