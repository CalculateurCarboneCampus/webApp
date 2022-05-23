<template>
  <div class="v-app-data-view-item">
    <div class="ccc-with-gutter">
      <div
          class="v-app-data-view-item__choice ccc-with-gutter"
      >{{data.name}}</div>
    </div>

    <div class="v-app-data-view-item__element ccc-with-gutter">
      <div
          class="v-app-data-view-item__element__value ccc-with-gutter"
      >
        {{data.value}}
      </div>
      <div
          class="v-app-data-view-item__element__unit ccc-with-gutter"
      >
        {{data.valueUnit}}
      </div>
    </div>

    <div class="v-app-data-view-item__element ccc-with-gutter">
      <div
          class="v-app-data-view-item__element__value has-not-interaction ccc-with-gutter"
      >
        {{data.tco2e}}
      </div>
      <div
          class="v-app-data-view-item__element__unit ccc-with-gutter"
      >
        tCO2e
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import type {ICCCDataItem} from "@/GlobalInterfaces"

export default defineComponent({
  props: {
    data: {
      required: true,
      type: Object as PropType<ICCCDataItem>
    }
  },

})</script>

<style lang="scss">
.v-app-data-view-item {
  display: flex;
  user-select: none;
  white-space: nowrap;

  .v-app-data-view-item__choice {
    background-color: var(--ccc-color-alternate);
    height: var(--ccc-ui-size-unit);
    line-height: var(--ccc-ui-size-unit);
    cursor: pointer;
  }

  .v-app-data-view-item__element {
    display: flex;
    align-items: center;

    .v-app-data-view-item__element__value {
      background-color: var(--ccc-color-alternate);
      height: var(--ccc-ui-size-unit);
      line-height: var(--ccc-ui-size-unit);
      cursor: pointer;

      &.has-not-interaction {
        cursor: default;
        background-color: var(--ccc-color-white);
      }
    }

    .v-app-data-view-item__element__unit {
      color: var(--ccc-color-white);
    }
  }


}
</style>
