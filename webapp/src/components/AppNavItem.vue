<template>
  <div
      :class="{'is-variant': variantStyle}"
      class="v-app-nav-item"
  >
    <div>{{name}}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  props: {
    name: {type: String, required: true},
    variantStyle: {
      type: Boolean,
      default: false,
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

  &.is-variant {
    border-radius: 100%;
  }
}
</style>
