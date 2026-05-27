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

      <div class="v-app-nav-item__info">
          <AppInfo
              v-if="entity"
              :msg="entity.description"
          />
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {ICCCDataEntity} from "@/GlobalInterfaces";
import AppInfo from "@/components/AppInfo.vue";

export default defineComponent({
    components: {AppInfo},
  props: {
    name: {type: String, required: true},
    variantStyle: {
      type: Boolean,
      default: false,
    },
    entity: {
      required: false,
      type: Object as PropType<ICCCDataEntity> | undefined
    },
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
      window.scroll({
        top: 0,
        behavior: "smooth",
      })
      this.dataStore.setCurrentEntiryName(this.name)
    }
  },

})</script>

<style lang="scss">
.v-app-nav-item {
  position: relative;
  --ccc-icon-size: 6rem;
  background-color: var(--ccc-color-dark);
  color: var(--ccc-color-white);
  text-align: center;
  width: var(--ccc-icon-size);
  height: var(--ccc-icon-size);
  user-select: none;
  cursor: pointer;
  margin-left: .5rem;

  transition: box-shadow 250ms, transform 250ms;
  transform: translate(0);
  box-shadow: none;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

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

  >  .v-app-nav-item__info {
      top: initial;
      left: initial;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(25%, 25%);
        height: auto;
        width: auto;
    }
}

</style>
