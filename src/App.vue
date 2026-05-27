<template>
  <div class="v-app">

    <app-header></app-header>

    <router-view></router-view>

    <app-footer></app-footer>

      <AppModalText
          v-if="dataModalMsg.msg"
          :msg="dataModalMsg.msg"
      />

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppNavigation from "@/components/AppNavigation.vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/app-footer.vue"
import AppModalText from "@/components/AppModalText.vue";
import {useDataModalMsg} from "@/stores/dataModalMsg";

export default defineComponent({
  components: {AppModalText, AppFooter, AppHeader, AppNavigation},
  props: {
  },

    data() {
        return {
            dataModalMsg: useDataModalMsg()
        }
    },

})</script>

<style lang="scss">
.v-app {
  max-width: 1280px;
  margin: auto;
}
</style>
