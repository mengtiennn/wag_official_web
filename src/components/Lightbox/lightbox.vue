<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import {tooltipStyle} from '@/composables/styles';
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
const props = defineProps({
    visible:{
        type: Boolean
    },
    files: {
        type: Array
    }
})
const emit = defineEmits(['update:modelValue'])

const isVisible = computed({
    get: ()=>props.visible,
    set: (v)=>{
        emit('update:modelValue', v)
    }
})
const close = () => {
    emit('update:modelValue')
}
</script>
<template>
    
    <vue-easy-lightbox
      :visible="isVisible"
      :imgs="props.files"
      @hide="close"
    >
        <template v-slot:prev-btn="{ prev }">
            <button v-if="props.files.length > 1" @click="prev" class="absolute left-[48px] top-[50%] mt-[-24px] rotate-180"><img src="@/assets/icon/arrow.svg" alt="" width="40px"></button>
        </template>

        <template v-slot:next-btn="{ next }">
            <button v-if="props.files.length > 1" @click="next" class="absolute right-[48px] top-[50%] mt-[-24px]"><img src="@/assets/icon/arrow.svg" alt="" width="40px"></button>
        </template>

        <template v-slot:close-btn="{ close }">
            <button @click="close" class="absolute right-[48px] top-[48px]"><img src="@/assets/icon/Close_big.svg" alt="" width="40px"></button>
        </template>

        <template v-slot:toolbar="{ toolbarMethods }">
            <div class="bg-[#FDFDFD] flex items-center gap-[8px] px-[2px] py-[2px] rounded-[4px] border absolute left-[50%] bottom-[48px]" style="transform: translateX(-50%)">
                <button @click="toolbarMethods.rotateLeft" v-tooltip.hover.top="{value: '逆時針 90° 旋轉', pt: tooltipStyle}"><img src="@/assets/icon/rotate-left.svg" alt="" width="40px"></button>
                <button @click="toolbarMethods.rotateRight" v-tooltip.hover.top="{value: '順時針 90° 旋轉', pt: tooltipStyle}"><img src="@/assets/icon/rotate-right.svg" alt="" width="40px"></button>
                <button @click="toolbarMethods.zoomIn" v-tooltip.hover.top="{value: '放大', pt: tooltipStyle}"><img src="@/assets/icon/zoom-in.svg" alt="" width="40px"></button>
                <button @click="toolbarMethods.zoomOut" v-tooltip.hover.top="{value: '縮小', pt: tooltipStyle}"><img src="@/assets/icon/zoom-out.svg" alt="" width="40px"></button>
            </div>
        </template>
    </vue-easy-lightbox>
</template>