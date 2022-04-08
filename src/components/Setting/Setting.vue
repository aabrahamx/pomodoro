<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    showSetting: Boolean
});

</script>

<template>
    <div class="wrapper">
        <button class="imgbtn">
            <img
                width="20"
                src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/ffffff/external-setting-essentials-pack-tanah-basah-glyph-tanah-basah.png"
            />
        </button>
        <div v-show="props.showSetting" class="input-cont">
            <div id="session-wrapper">
                <label for="sessionNumber">Sessions</label>
                <input
                    type="number"
                    id="sessionNumber"
                    min="1"
                    max="10"
                    step="1"
                />
            </div>
            <div>
                <label for="focus">Work</label>
                <input
                    type="number"
                    min="5"
                    max="120"
                    step="5"
                    id="focus"
                />
            </div>
            <div>
                <label for="short-break">Short Break</label>
                <input
                    type="number"
                    min="5"
                    max="30"
                    step="5"
                    id="short-break"
                />
            </div>
            <div>
                <label for="long-break">Long Break</label>
                <input
                    type="number"
                    min="15"
                    max="120"
                    step="15"
                    id="long-break"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    outline: 1px solid white;
}
.wrapper {
    margin-right: 10px;
    display: flex;
    align-items: flex-start;
}
.imgbtn {
    border: 0;
    margin: 0;
    padding: 5px 3px;
    background-color: inherit;
}

</style>