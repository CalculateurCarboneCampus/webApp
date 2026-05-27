<template>
    <div class="v-app-modal-text"
    >
        <div
            class="v-app-modal-text__msg"
            v-html="msg.replace('\n', '<br><br>')"
        />
        <div class="v-app-modal-text__background"
             @click="dataModalMsg.msg = null"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataModalMsg} from "@/stores/dataModalMsg";

export default defineComponent({
    props: {
        msg: {type: String, required: true}
    },

    data() {
        return {
            dataModalMsg: useDataModalMsg()
        }
    },

})</script>

<style lang="scss">
.v-app-modal-text {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
}

.v-app-modal-text__background {
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
}

.v-app-modal-text__msg {
    margin: 15% auto;
    position: relative;
    z-index: 10;
    background: white;
    width: 100%;
    max-width: 40em;
    height: auto;
    text-align: left;
    box-sizing: border-box;
    border-radius: 1rem;
    box-shadow: var(--ccc-box-shadow);
    font-size: 1.25rem;
    line-height: 1.25em;
    overflow: auto;
    padding: 2rem 1rem;

    > *:first-child {
        margin-top: 0;
    }

    > *:last-child {
        margin-bottom: 0;
    }
}

</style>
