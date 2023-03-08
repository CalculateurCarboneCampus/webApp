<template>
  <div class="v-app-data-view ccc-with-gutter-xl ccc-with-raw">
    <div
        v-if="dataSection"
        class="v-app-data-view__section ccc-no-margin"
    >
      <div class="ccc-with-gutter ccc-no-margin">
        <h4
            class="v-app-data-view__section__title ccc-with-gutter"
        >{{ dataSection.name }}</h4>
      </div>

      <div style="text-align: right" >Facteurs d'émissions</div>

      <template
        v-for="(dataItem, ItemIndex) of arrayOfItemInDataSection"
        v-if="showItem"
      >
          <app-data-view-item
            v-if="dataItem.edited"
            :index="ItemIndex"
            :parent-section-index="index"
          ></app-data-view-item>
      </template>

      <div
          class="ccc-with-gutter v-app-data-view__listItemToAdd"
          v-if="showItem && arrayOfUneditedItemInDataSection.length > 0"
      >
        <button-add
            @click="showAddNewItemList = !showAddNewItemList"
        >Nouvelle entrée</button-add>
        <div
            v-if="showAddNewItemList"
            class="v-app-data-view__listItemToAdd__item"
        >
          <button-add
              v-for="unedtitedItem of arrayOfUneditedItemInDataSection"
              :is-alternate="true"
              @click="unedtitedItem.edited = true; showAddNewItemList = false"
          >
            {{ unedtitedItem.name }}
          </button-add>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import AppDataViewItem from "@/components/AppDataViewItem.vue"
import ButtonAdd from "@/components/ButtonAdd.vue"
import {useDataStore} from "@/stores/dataStore"
import type {IUserEditedDataEntity, IUserEditedDataSection} from "@/global/User"
import type {IUserEditedDataItem} from "@/global/User"


export default defineComponent({
  components: {ButtonAdd, AppDataViewItem},

  data() {
    return {
      dataStore: useDataStore(),
      showItem: true,
      showAddNewItemList: false,
    }
  },

  props: {
    index: {
      required: true,
      type:  Number,
    },
  },

  computed: {
    dataSection(): IUserEditedDataSection | null {
      if( ! this.dataStore.user.tempCurrentEditedProject) return null

      const indexOfCurrentEntity = this.dataStore.user.tempCurrentEditedProject.dataEntity
          .indexOf(this.dataStore.user.tempCurrentEditedProject.dataEntity.filter( (value) => {
            return value.entityName === this.dataStore.currentEntityName
          })[0] || null)

      return this.dataStore.user.tempCurrentEditedProject.dataEntity[indexOfCurrentEntity]?.entitySections[this.index] || null
    },

    arrayOfItemInDataSection(): IUserEditedDataItem[] {
      return this.dataSection?.item || []
    },

    arrayOfUneditedItemInDataSection():IUserEditedDataItem[] {
      return this.dataSection?.item.filter(value => {
        return !value.edited
      }) || []
    }
  },

  watch: {
    arrayOfItemInDataSection() {
      this.showItem = false
      // todo: force to reload component
      window.setTimeout(()=>{
        this.showItem = true
      }, 50)
    }
  }

})</script>

<style lang="scss">
.v-app-data-view {
  .v-app-data-view__section > * {
    margin-bottom: 1rem;
  }

  .v-app-data-view__section__title {
    height: var(--ccc-ui-size-unit);
    display: inline-block;
    line-height: var(--ccc-ui-size-unit);
    font-style: italic;
    border-top-right-radius:    var(--ccc-ui-size-unit);
    border-bottom-right-radius: var(--ccc-ui-size-unit);
    background-color: var(--ccc-color-white);
    box-shadow: var(--ccc-box-shadow);
    padding-right: var(--ccc-ui-size-unit);
  }
}

.v-app-data-view__listItemToAdd {
  position: relative;
}

.v-app-data-view__listItemToAdd__item {
  background: var(--ccc-color-alternate);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding-top: 1rem;
  transform: translateX(.5rem);
  box-shadow: 0 20px 20px -10px black;
  z-index: 1;
}
</style>
