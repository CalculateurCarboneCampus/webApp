<template>
  <div class="v-admin-view ccc-with-gutter">
    <h1 class="ccc-with-gutter">Mon espace: {{dataStore.user.username}}</h1>

    <div
        class="v-admin-view__projects"
    >
      <div
          class="v-admin-view__projects__item ccc-with-gutter"
          v-for="project of projectsDrafted"
      >
        <div
            class="v-admin-view__projects__item__slug"
        >{{project.slug}}</div>
        <div>
          <div
              style="margin-right: 1rem"
              class="ccc-ui-button--small v-admin-view__projects__item__button"
              @click="changeProjectContentStatus(project, 'archive', project.slug)"
          >archiver 😴</div>
<!--          <div-->
<!--              style="margin-right: 1rem"-->
<!--              class="ccc-ui-button&#45;&#45;small v-admin-view__projects__item__button"-->
<!--          >publier</div>-->
          <router-link
              style="margin-right: 1rem"
              class="ccc-ui-button--small v-admin-view__projects__item__button"
              :to="{name: 'admin.project', params: {userID: user.userID, projectSlug: project.slug, currentEntityName: 'Résultat'}}"
          >notes projet</router-link>
          <router-link
              class="ccc-ui-button--small v-admin-view__projects__item__button"
              :to="{name: 'admin.project', params: {userID: user.userID, projectSlug: project.slug}}"
          >modifier -></router-link>
        </div>
      </div>

      <h3
          style="margin-top: 5rem; user-select: none; cursor: pointer"
          class="ccc-with-gutter"
          @click="archiveViewIsOpen = !archiveViewIsOpen"
          v-if="projectsArchived.length > 0"
      >Éléments archivés [{{archiveViewText}}]</h3>

      <div
          v-if="archiveViewIsOpen && projectsArchived.length > 0"
          class="v-admin-view__projects__archived"
      >
        <div
            class="v-admin-view__projects__item v-admin-view__projects__item--archived ccc-with-gutter"
            v-for="project of projectsArchived"
        >
          <div
              class="v-admin-view__projects__item__slug"
          >{{project.slug}}</div>
          <div>
            <div
                style="margin-right: 1rem"
                class="ccc-ui-button--small v-admin-view__projects__item__button"
                @click="changeProjectContentStatus(project, 'draft', project.slug)"
            >restaurer ⚡</div>

            <div
                style="background-color: hsl(0 75% 35% / 1)"
                class="ccc-ui-button--small v-admin-view__projects__item__button"
                @click="changeProjectContentStatus(project, 'delete', project.slug)"
            >supprimer 💣</div>
          </div>
        </div>


      </div>


      <form
          class="v-admin-view__add-calculation"
          @click="focusToInput"
          @submit="addCalculation"
      >
        <div class="ccc-ui-circle" @click="addCalculation">+</div>
        <div>Nouveau calcul</div>
        <input ref="nameNewDocumentInput" type="text" v-model="newProjectName">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataStore} from "@/stores/dataStore"
import type {api} from "@/global/api"
import type {IUserEditedProject, User} from "@/global/User"
import type {IUserEditedDataEntity} from "@/global/User"

export default defineComponent({

  data() {
    return {
      dataStore: useDataStore(),
      newProjectName: '',
      archiveViewIsOpen: false,
    }
  },

  computed: {

    archiveViewText(): string {
      if(this.archiveViewIsOpen) return "cacher"
      return "afficher"
    },

    user(): User {
      return this.dataStore.$state.user as User
    },

    projectsDrafted(): api.project[] {
      return Object.values( this.dataStore.$state.user.listOfProjects ).filter(value => {
        const projectContent: IUserEditedProject = JSON.parse( value.content.content )
        return projectContent.status === 'draft'
      })
    },

    projectsArchived(): api.project[] {
      return Object.values( this.dataStore.$state.user.listOfProjects ).filter(value => {
        const projectContent: IUserEditedProject = JSON.parse( value.content.content )
        return projectContent.status === 'archive'
      })
    }

  },

  methods: {
    changeProjectContentStatus(project: api.project, newStatus: "draft" | "publish" | "delete" | "archive", projectSlug: string) {
      this.dataStore.waitForSavingData = true

      const tempContent = JSON.parse(project.content.content) as IUserEditedProject

      tempContent.status = newStatus

      this.dataStore.user.save({
        value: tempContent,
        projectName: projectSlug,
      }).then(response => {
        if( response.success ) {
          this.dataStore.user.reloadData().then(() => {
            this.dataStore.waitForSavingData  = false
            this.dataStore.dataHasChange      = false
          })
        }
        else this.dataStore.user.error = response.error
      })
    },

    async addCalculation(): Promise<void> {
      const newProjectResponse = await this.dataStore.user.createNewProject(this.dataStore.CCCData, this.newProjectName)
      if(newProjectResponse.success) await this.$router.push({
        name: 'admin.project',
        params: {
          userID: this.user.userID,
          projectSlug: newProjectResponse.slugOfNewProject
        }
      })
    },

    focusToInput() {
      if(this.$refs.nameNewDocumentInput instanceof HTMLInputElement)
        this.$refs.nameNewDocumentInput.focus()
    },
  },

})</script>

<style lang="scss">
.v-admin-view {
  .v-admin-view__projects {
  }

  .v-admin-view__add-calculation {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;
    transition: background-color .25s ease-in-out;

    > * {
      transition: transform .5s ease-in-out;
    }

    input {
      opacity: 0;
      transition: opacity .5s ease-in-out;
    }

    &:hover {
      background: var(--ccc-color-main);

      div {
        transform: translate(0, -1rem);
      }

      input {
        opacity: 1;
      }

      .ccc-ui-circle {
        transform: translate(0, -2rem);
      }
    }
  }

  .v-admin-view__projects__item__button {
    background-color: var(--ccc-color-dark);
    color: var(--ccc-color-white);
    padding: .5rem;
  }

  .v-admin-view__projects__item {
    padding:    1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    margin-left: -.5rem;
    margin-right: -.5rem;

    &:hover {
      background-color: var(--ccc-color-main);
      border-radius: 1rem;
    }

    > * {
      display: block;
    }
  }
}
</style>
