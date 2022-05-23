<template>
  <div class="v-app-data-view-item">
    <div class="v-app-data-view-item__choice-container ccc-with-gutter">
      <div class="v-app-data-view-item__choice ccc-with-gutter"
      >{{dataItem.name}}</div>
    </div>

    <div class="v-app-data-view-item__element ccc-with-gutter">

      <input
          class="v-app-data-view-item__element__value ccc-with-gutter"
          type="number"
          v-model="dataItem.donnes"
      >

      <div
          class="v-app-data-view-item__element__unit ccc-with-gutter"
      >
        {{ dataItem.unit }}
      </div>
    </div>

    <div class="v-app-data-view-item__element ccc-with-gutter">
      <div
          class="v-app-data-view-item__element__value has-not-interaction ccc-with-gutter"
      >
        {{dataItem.tco2e}}
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
import type {ICCCDataItem, ICCCDataSection} from "@/GlobalInterfaces"
import {useDataStore} from "@/stores/dataStore"

export default defineComponent({
  props: {
    index: {
      required: true,
      type: Number,
    },
    parentSectionIndex: {
      required: true,
      type: Number,
    },
  },

  data() {
    return {
      dataStore: useDataStore()
    }
  },

  computed: {
    dataItem(): ICCCDataItem {
      const indexOfCurrentEntity = this.dataStore.CCCData
          .indexOf(this.dataStore.CCCData.filter( (value) => {
            return value.entityName === this.dataStore.currentEntityName
          })[0] || null)

      return this.dataStore
          .CCCData[indexOfCurrentEntity]
          .entitySections[this.parentSectionIndex]
          .item[this.index]

    }
  },


})</script>

<style lang="scss">
.v-app-data-view-item {
  display: flex;
  user-select: none;
  white-space: nowrap;

  > * {
    width: calc(100% / 4);
    box-sizing: border-box;
  }

  .v-app-data-view-item__choice-container {
    flex-grow: 0;
    width: 100%;
  }

  .v-app-data-view-item__choice {
    background-color: var(--ccc-color-alternate);
    height: var(--ccc-ui-size-unit);
    line-height: var(--ccc-ui-size-unit);
    cursor: pointer;
  }

  .v-app-data-view-item__element {
    display: flex;
    align-items: center;

    > * {
      box-sizing: border-box;
      width: 50%;
    }

    .v-app-data-view-item__element__value {
      display: block;
      border: none;
      padding-left: var(--ccc-gutter-half);
      padding-right: 0;
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
