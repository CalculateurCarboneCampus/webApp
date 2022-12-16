<template>
  <div class="v-project-draft-view">
    <div class="ccc-with-gutter">
      <app-navigation></app-navigation>
    </div>

    <template
        v-if="dataStore.currentEntityName !== 'Résultat'"
    >
      <div class="v-project-draft-view__data-container ccc-with-gutter">
        <div class="v-project-draft-view__data-container__header">
          <h1 class="v-project-draft-view__project-title">{{$route.params.projectSlug}}</h1>
          <button class="ccc-ui-button" type="button" @click="save">Enregistrer</button>
        </div>
        <section
            class="v-section-data ccc-with-raw"
        >
          <app-data-view
              v-for="(data, index) of dataSection"
              :index="index"
          ></app-data-view>
        </section>
      </div>

      <div class="ccc-with-gutter">
        <section
            class="v-result-viewer"
        >
          <render></render>
        </section>
      </div>
    </template>

    <template v-else>
      <div class="v-result-viewer__print ccc-with-gutter">
        <div
            class="v-result-viewer__print__project-title"
        >
          <h1>{{$route.params.projectSlug}}</h1>
        </div>
        <button
            class="ccc-ui-button v-result-viewer__print__export"
            @click="exportPDF()"
        >export PDF</button>
        <div class="v-result-print"
        >
          <h1
              contenteditable="true"
              style="padding: 4rem"
          >Titre</h1>
          <div
              contenteditable="true"
              style="padding: 4rem; padding-top: 0;"
          >text descriptif</div>
        </div>
        <div
            class="v-result-print"
        >
          <div
              class="v-result-print__logo"
          ><img src="/logo.svg" alt=""></div>

          <div
              class="v-result-print__header"
          >
            <div
                class="v-result-print__project-name"
            >
              {{$route.params.projectSlug}}
            </div>
            {{dataStore.user.username}}
            <br>exporté le {{formatedDate}}
          </div>

          <div
              class="v-result-print__body"
          >
            <div
                class="v-result-print__circle-result"
            >
              <div
                  class="v-result-print__circle-result__line"
                  v-for="currentResult of concatResults"
                  :style="{
                  transform: 'rotate(' + currentResult.concatRotationPercent + 'deg'
                    }"
              >
                <template
                    v-if="dataStore.getTotalValueOfEntity( currentResult.dataEntity.entityName ).toFixed(2) > 0"
                >
                  <div
                      class="v-result-print__circle-result__line__graphic"
                  ></div>
                  <div class="v-result-print__circle-result__line__name"    >{{currentResult.dataEntity.entityName}}</div>
                </template>
              </div>
            </div>

            <div
                class="v-result-print__stat-result"
            >
              <h1 class="v-result-print__stat-result__title" >TOTAL: {{dataStore.totalValue.toFixed(2).replace('.', ',')}}<span>tCO2e</span></h1>
              <div>
                <div
                    class="v-result-print__stat-result__entity-box"
                    v-for="dataEntity of dataStore.user.tempCurrentEditedProject"
                >
                  <template
                      v-if="dataStore.getTotalValueOfEntity(dataEntity.entityName).toFixed(2) > 0"
                  >
                    <div
                        class="v-result-print__stat-result__entity-box__value"
                    >{{dataEntity.entityName}}: {{dataStore.getTotalValueOfEntity(dataEntity.entityName).toFixed(2).replace('.', ',')}}</div>
                    <div
                        class="v-result-print__stat-result__entity-box__viz"
                    >
                      <span :style="{width: (dataStore.getTotalValueOfEntity(dataEntity.entityName) * 100 / dataStore.totalValue).toFixed(2) + '%'}"></span>
                      <span>{{(dataStore.getTotalValueOfEntity(dataEntity.entityName) * 100 / dataStore.totalValue).toFixed(2).replace('.', ',') }}%</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>

          </div>

          <div
              class="v-result-print__footer"
          >
            <div class="ccc-with-gutter">
              Développé par:
            </div>

            <div class="ccc-with-gutter">
              <img
                  alt="logo hesso"
                  src="../assets/logo_heg-ge.svg"
              >
            </div>

            <div class="ccc-with-gutter">
              <img
                  alt="logo hesso"
                  src="/logo-hesso.svg"
              >
            </div>
          </div>

        </div>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"
import type {ICCCDataSection} from "@/GlobalInterfaces"
import AppNavigation from "@/components/AppNavigation.vue"
import Render from "@/components/Render.vue"
import AppDataView from "@/components/AppDataView.vue"
import {toJpeg} from "html-to-image"
import type {Options} from "html-to-image/lib/types"
import type {IUserEditedDataEntity} from "@/global/User";

export default defineComponent({
  components: {Render, AppNavigation, AppDataView},
  data() {
    return {
      dataStore: useDataStore()
    }
  },

  mounted() {
    if (this.project === null) return
    console.log( JSON.parse(JSON.parse(this.project.content.content)) )
    this.dataStore.user.tempCurrentEditedProject = JSON.parse(JSON.parse(this.project.content.content))
  },

  computed: {
    concatResults(): { concatRotationPercent: number, dataEntity: IUserEditedDataEntity }[] {
      if( this.dataStore.user.tempCurrentEditedProject === null ) return []

      const toReturn: {concatRotationPercent: number, dataEntity: IUserEditedDataEntity }[] = []

      let concatRotationPercent = 0

      for(const dataEntity of this.dataStore.user.tempCurrentEditedProject) {
        const percent = (this.dataStore.getTotalValueOfEntity(dataEntity.entityName) * 100 / this.dataStore.totalValue)

        concatRotationPercent += 360*percent/100

        console.log( percent )
        console.log( concatRotationPercent )


        toReturn.push({
          concatRotationPercent: concatRotationPercent,
          dataEntity: dataEntity,
        })
      }

      return toReturn
    },

    project(): api.project | null {
      return Object.values(this.dataStore.user.listOfProjects).find(value => {
        return value.slug === this.$route.params.projectSlug
      }) || null
    },

    dataSection(): ICCCDataSection[] {

      if(this.dataStore.user.tempCurrentEditedProject === null) return []

      return this.dataStore.user.tempCurrentEditedProject.filter( (value) => {
        return value.entityName === this.dataStore.currentEntityName
      })[0]?.entitySections
    },

    formatedDate(): string {
      const date = new Date()
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }
  },

  methods: {
    save() {
      this.dataStore.user.save({
        value: JSON.stringify(this.dataStore.user.tempCurrentEditedProject),
        projectName: this.$route.params.projectSlug,
      }).then(response => {
        if( response.success ) this.dataStore.user.reloadData()
        else this.dataStore.user.error = response.error
      })
    },

    exportPDF() {
      const element = document.querySelector('.v-result-print') as HTMLElement

      const toJpegOption: Options = {
        quality: 1,
        pixelRatio: 4,
        style: {
          transform: 'none'
        },
      }

      toJpeg(element, toJpegOption ).then(dataUrl => {
        const htmlLinkElement = document.createElement('a')
        htmlLinkElement.href = dataUrl
        htmlLinkElement.download="Calculateur_carbone_campus.jpg"
        htmlLinkElement.click()
        element.style.transform = ''
      })
    },
  },

})
</script>

<style lang="scss">
.v-project-draft-view {
  display: flex;

  .v-section-data {
    background-color: var(--ccc-color-main);
    border-radius: var(--ccc-ui-size-unit);
    box-shadow: var(--ccc-box-shadow);
    margin-right: var(--ccc-gutter-half);
  }

  .v-project-draft-view__project-title {
    margin: 0;
  }

  .v-project-draft-view__data-container {
    flex-grow: 1;
  }

  .v-project-draft-view__data-container__header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
    flex-direction: row;
  }

  .v-result-print {
    width: 21cm;
    height: 29.7cm;
    background-color: white;
    transform: scale(.8);
    transform-origin: top left;
    position: relative;
    flex-shrink: 0;
  }

  .v-result-viewer__print {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .v-result-viewer__print__export {
    margin-left: calc(21cm / 100 * 80);
    transform: translate(-100%);
  }

  .v-result-viewer__print__project-title {
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    > * {
      margin: 0;
    }
  }

  .v-result-print__logo {
    position: absolute;
    top: 1cm;
    left: 1cm;
    > img {
      display: block;
      width: auto;
      height: 2cm;
    }
  }
  .v-result-print__header {
    position: absolute;
    top: 1cm;
    left: calc(100%/3);
  }

  .v-result-print__project-name {
    font-weight: bold;
  }

  .v-result-print__body {
    position: relative;
    margin: auto;
    top: calc(100% / 5 * 1);
    left: 0;
    width: calc( 100% - 2cm);
    display: flex;
  }

  .v-result-print__circle-result {
    position: relative;
    width:  calc( (21cm - 1.5cm) / 2 - .5cm);
    height: calc( (21cm - 1.5cm) / 2 - .5cm);
    border: solid 1pt;
    border-radius: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .v-result-print__circle-result__line{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform-origin: top left;
  }

  .v-result-print__circle-result__line__graphic {
    width: 100%;
    background: black;
    height: 1px;
  }

  .v-result-print__circle-result__line__name {
    position: absolute;
    right: 0;
    text-align: right;
    max-width: 50%;
  }

  .v-result-print__stat-result {
    width: calc( 50% + .5cm);
    box-sizing: border-box;
    padding-left: 1cm;
  }

  .v-result-print__stat-result__title {
    font-size: 2.4rem;
    line-height: 3rem;
    margin-top: 0;

    > span {
      font-weight: 900;
      font-size: .8rem;
    }
  }

  .v-result-print__stat-result__entity-box {
    margin-top: 1rem;
  }

  .v-result-print__stat-result__entity-box__value {
    font-size: 1.6rem;
    line-height: 2rem;
  }

  .v-result-print__stat-result__entity-box__viz {
    > span {
      display: inline-block;

      &:first-child {
        background: black;
        height: 1rem;
        margin-right: 1rem;
        min-width: 2px;
      }
    }
  }

  .v-result-print__footer {
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 1cm;
    left: 0;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      height: 1cm;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
