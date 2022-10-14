<template>
  <template v-if="dataItem !== null" >
    <div class="v-app-data-view-item" v-if="dataItem.edited" >
      <div class="v-app-data-view-item__choice-box ccc-with-gutter">
        <div
            class="v-app-data-view-item__choice-box__ui ccc-ui-circle"
            @click="removeItem"
        >-</div>
        <div class="v-app-data-view-item__choice-box__value"
        >{{dataItem.name}}</div>
      </div>

      <div class="v-app-data-view-item__element ccc-with-gutter">

        <div class="v-app-data-view-item__element__value">
          <input
              class="v-app-data-view-item__element__value__input"
              type="number"
              :min="valueMin"
              :max="valueMax"
              :step="valueStep"
              v-model="dataItemDonnes"
          >
          <div
              class="v-app-data-view-item__element__value__ui-box"
          >
            <div class="v-app-data-view-item__element__value__ui-box__ui" @click="changeValue(+1)" >+</div>
            <div class="v-app-data-view-item__element__value__ui-box__ui" @click="changeValue(-1)" >-</div>
          </div>
        </div>

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
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {PropType} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {IUserEditedDataItem} from "@/global/User"

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
      dataStore: useDataStore(),
      dataItem: null as null | IUserEditedDataItem,
      valueMin:   0,
      valueMax:   9_999,
      valueStep:  1,
    }
  },

  mounted() {
    if (!this.dataStore.user.tempCurrentEditedProject) return

    const indexOfCurrentEntity = this.dataStore.user.tempCurrentEditedProject
        .indexOf(this.dataStore.user.tempCurrentEditedProject.filter((value) => {
          return value.entityName === this.dataStore.currentEntityName
        })[0] || null)

    this.dataItem = this.dataStore.user
        .tempCurrentEditedProject[indexOfCurrentEntity]
        .entitySections[this.parentSectionIndex]
        .item[this.index]
  },

  methods: {
    changeValue(value: number) {
      if( value > 0 ) this.dataItemDonnes++
      else this.dataItemDonnes--
    },

    removeItem() {
      this.dataItem!.edited = false
    }
  },

  computed: {

    dataItemDonnes: {
      get(): number {
        return this.dataItem?.donnes || 0
      },
      set(newValue: any) {
        console.log(newValue)

        if(this.dataItem === null) return

        this.dataItem.donnes = 0 // reset for v-model

        newValue = +newValue

        if(Number.isNaN( newValue) ) newValue = 0
        if(newValue > this.valueMax) newValue = this.valueMax
        if(newValue < this.valueMin) newValue = this.valueMin

        this.dataItem.donnes = newValue
      },
    }
  },


})</script>

<style lang="scss">
.v-app-data-view-item {
  position: relative;
  display: flex;
  user-select: none;
  white-space: nowrap;

  > * {
    width: 7.8em;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .v-app-data-view-item__choice-box {
    flex-shrink: 1;
    width: 100%;
  }

  .v-app-data-view-item__choice-box__value {
    background-color: var(--ccc-color-alternate);
    padding-left: var(--ccc-gutter);
    cursor: pointer;
    width: 250px;
    padding-right: 1rem;
    white-space: break-spaces;
    line-height: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
  }

  .v-app-data-view-item__choice-box__ui {
    position: absolute;
    top: 50%;
    left: var(--ccc-gutter-half);
    transform: translate( -50%, -50%);
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
      text-align: right;
      padding-left: 0;
      padding-right: 0;
      height: var(--ccc-ui-size-unit);
      line-height: var(--ccc-ui-size-unit);
      cursor: pointer;
      width: 8ch;
      position: relative;

      &.has-not-interaction {
        padding-right: 1ch;
        cursor: default;
        background-color: var(--ccc-color-white);
      }

      .v-app-data-view-item__element__value__input {
        border: none;
        display: block;
        background-color: var(--ccc-color-alternate);
        line-height: var(--ccc-ui-size-unit);
        width: 100%;
        height: 100%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 2.5ch;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      .v-app-data-view-item__element__value__ui-box {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        width: 2ch;
        text-align: center;
        flex-wrap: nowrap;
        height: 100%;

        > * {
          display: block;
          background: var(--ccc-color-main--light);
          height: 50%;
          flex-shrink: 1;
          line-height: 1rem;
        }
      }
    }

    .v-app-data-view-item__element__unit {
      color: var(--ccc-color-white);
    }
  }

}
</style>
