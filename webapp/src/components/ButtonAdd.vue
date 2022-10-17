<template>
  <div class="v-button-add ccc-with-gutter" :class="{'is-alternate': isAlternate}">
    <div class="v-button-add__ui">{{icon}}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  props: {
    icon: {
      default: '+',
      type: String,
    },
    isAlternate: {
      type: Boolean,
      default: false,
    }
  },

})</script>

<style lang="scss">
.v-button-add {
  position: relative;
  background-color: var(--ccc-color-alternate);
  padding-left: calc(var(--ccc-ui-size-unit) / 2);
  display: inline-block;
  cursor: pointer;
  height: var(--ccc-ui-size-unit);
  line-height: var(--ccc-ui-size-unit);
  user-select: none;

  .v-button-add__ui {
    position: absolute;
    top: 50%;
    left: 0;
    background-color: var(--ccc-color-white);
    transform: translate( -50%, -50%);
    border-radius: 100%;
    height: var(--ccc-ui-size-unit);
    width: var(--ccc-ui-size-unit);
    text-align: center;
  }

  &.is-alternate {
    padding-left: var(--ccc-gutter-half);
    padding-right: calc(var(--ccc-ui-size-unit) / 2);

    .v-button-add__ui {
      left: auto;
      right: 0;
      transform: translate( 50%, -50%);
    }
  }
}
</style>
