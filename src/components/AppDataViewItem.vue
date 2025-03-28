<template>
  <template v-if="dataItem !== null" >
    <div class="v-app-data-view-item">
      <div
          class="v-app-data-view-item__choice-box ccc-with-gutter"
          @click="removeItem"
      >
        <div
            class="v-app-data-view-item__choice-box__ui ccc-ui-circle"
        >-</div>
        <div class="v-app-data-view-item__choice-box__value"
        >{{dataItem.name}}</div>
      </div>

      <div class="v-app-data-view-item__element v-app-data-view-item__element--value ccc-with-gutter">

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

      <div
          v-if="currentEditedEntity?.hasLifeCycleOption || false"
          class="v-app-data-view-item__element v-app-data-view-item__element--value ccc-with-gutter"
      >

        <div class="v-app-data-view-item__element__value">
          <input
              class="v-app-data-view-item__element__value__input"
              type="number"
              :min="valueMinForLifeCycle"
              :max="valueMaxForLifeCycle"
              :step="valueStepForLifeCycle"
              v-model="dataItemLifeCycle"
          >
          <div
              class="v-app-data-view-item__element__value__ui-box"
          >
            <div class="v-app-data-view-item__element__value__ui-box__ui" @click="changeValueOfLifeCycle(+1)" >+</div>
            <div class="v-app-data-view-item__element__value__ui-box__ui" @click="changeValueOfLifeCycle(-1)" >-</div>
          </div>
        </div>

        <div
            class="v-app-data-view-item__element__unit ccc-with-gutter"
        >
          année(s)
        </div>
      </div>

      <div class="v-app-data-view-item__element ccc-with-gutter">
        <div
            class="v-app-data-view-item__element__value has-not-interaction ccc-with-gutter"
        >
          {{dataItem.tco2e.toString().replace('.', ',')}}
        </div>
        <div
            class="v-app-data-view-item__element__unit ccc-with-gutter"
        >
          kgCO2e
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {IUserEditedDataItem} from "@/global/User"
import type {IUserEditedDataEntity} from "@/global/User"

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
      valueMax:   9_999_999,
      valueStep:  1,
      valueMinForLifeCycle:   1,
      valueMaxForLifeCycle:   100,
      valueStepForLifeCycle:  1,
    }
  },

  mounted() {
    if (!this.dataStore.user.tempCurrentEditedProject) return

    const indexOfCurrentEntity = this.dataStore.user.tempCurrentEditedProject.dataEntity
        .indexOf(this.dataStore.user.tempCurrentEditedProject.dataEntity.filter((value) => {
          return value.entityName === this.dataStore.currentEntityName
        })[0] || null)

    this.dataItem = this.dataStore.user
        .tempCurrentEditedProject
        .dataEntity[indexOfCurrentEntity]
        .entitySections[this.parentSectionIndex]
        .item[this.index]
  },

  methods: {
    changeValue(value: number) {
      if( value > 0 ) this.dataItemDonnes++
      else this.dataItemDonnes--
    },

    changeValueOfLifeCycle(value: number) {
      if( value > 0 ) this.dataItemLifeCycle++
      else this.dataItemLifeCycle--
    },

    removeItem() {
      this.dataStore.dataHasChange = true
      this.dataItem!.edited = false
    }
  },

  computed: {

    dataItemLifeCycle: {
      get(): number {
        return this.dataItem?.yearLifeCycle || this.valueMinForLifeCycle
      },
      set(newValue: any) {

        this.dataStore.dataHasChange = true

        if(this.dataItem === null) return

        this.dataItem.yearLifeCycle = this.valueMinForLifeCycle // reset for v-model

        newValue = +newValue

        if(Number.isNaN( newValue) ) newValue = this.valueMin
        if(newValue > this.valueMaxForLifeCycle) newValue = this.valueMaxForLifeCycle
        if(newValue < this.valueMinForLifeCycle) newValue = this.valueMinForLifeCycle

        this.dataItem.yearLifeCycle = newValue
      },
    },


    dataItemDonnes: {
      get(): number {
        return this.dataItem?.donnes || 0
      },
      set(newValue: any) {

        this.dataStore.dataHasChange = true

        if(this.dataItem === null) return

        this.dataItem.donnes = 0 // reset for v-model

        newValue = +newValue

        if(Number.isNaN( newValue) ) newValue = 0
        if(newValue > this.valueMax) newValue = this.valueMax
        if(newValue < this.valueMin) newValue = this.valueMin

        this.dataItem.donnes = newValue
      },
    },

    indexOfCurrentEntity(): number | null {
      if( ! this.dataStore.user.tempCurrentEditedProject) return null

      return  this.dataStore.user.tempCurrentEditedProject.dataEntity
          .indexOf(this.dataStore.user.tempCurrentEditedProject.dataEntity.filter( (value) => {
            return value.entityName === this.dataStore.currentEntityName
          })[0] || null)
    },

    currentEditedEntity(): IUserEditedDataEntity | null {
      if( ! this.dataStore.user.tempCurrentEditedProject) return null
      if(this.indexOfCurrentEntity === null) return null

      return this.dataStore.user.tempCurrentEditedProject.dataEntity[this.indexOfCurrentEntity]
    },
  },


})</script>

<style lang="scss">
.v-app-data-view-item {
  position: relative;
  display: flex;
  user-select: none;
  white-space: nowrap;

  > * {
    width: 10rem;
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
      width: 20ch;
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
        -moz-appearance: textfield;
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

    &.v-app-data-view-item__element--value {
      //width: 10rem;
    }
  }

}
</style>
