<template>
  <div
      :class="{
        'is-variant': variantStyle,
        'is-active': isActive,
      }"
      class="v-app-nav-item"
      @click="navItemActivated"
  >
    <div>{{name}}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"

export default defineComponent({
  props: {
    name: {type: String, required: true},
    variantStyle: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  computed: {
    isActive():boolean {
      return this.dataStore.currentEntityName === this.name
    }
  },

  methods: {
    navItemActivated() {
      this.dataStore.currentEntityName = this.name
    }
  },

})</script>

<style lang="scss">
.v-app-nav-item {
  --ccc-icon-size: 5rem;
  background-color: var(--ccc-color-dark);
  color: var(--ccc-color-white);
  text-align: center;
  width: var(--ccc-icon-size);
  height: var(--ccc-icon-size);
  line-height: var(--ccc-icon-size);
  user-select: none;
  cursor: pointer;
  margin-left: .5rem;

  transition: box-shadow 250ms, transform 250ms;
  transform: translate(0);
  box-shadow: none;

  &:hover {
    background-color: var(--ccc-color-main);
  }

  &.is-variant {
    border-radius: 100%;
  }

  &.is-active {
    background: var(--ccc-color-main);
    box-shadow: var(--ccc-box-shadow);
    transform: translate(-.5rem, -.5rem);
  }
}
</style>
