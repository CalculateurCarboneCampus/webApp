<template>
    <div class="v-app-info"
         @click.stop="infoClicked"
    >
        <div class="v-app-info__icon"
        >i</div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {useDataModalMsg} from "@/stores/dataModalMsg.Ts";

export default defineComponent({
    props: {
        msg: {type: String, required: true}
    },

    data() {
        return {
            dataModalMsg: useDataModalMsg()
        }
    },

    methods: {
        infoClicked() {
            this.dataModalMsg.msg = this.msg
        },
    }


})</script>

<style lang="scss">
.v-app-info {
    background: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    box-sizing: border-box;
}
</style>
