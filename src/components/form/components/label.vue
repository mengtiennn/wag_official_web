<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useForm } from '@/composables/useForm.ts'
import Button from 'primevue/button';

const { styleOptionTooltip } = useForm()

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    for: {
        type: String,
    },
    iconURL: {
        type: String,
    },
    iconHoverURL: {
        type: String,
    },
    iconTooltip: {
        type: String,
    },
    iconAlt: {
        type: String,
    },
    isRequired: {
        type: Boolean,
        default: false
    }
})

const isHover = ref(false)

const mouseEnter = () => {
    isHover.value = true
}

const mouseLeave = () => {
    isHover.value = false
}

const isMobile = ref<boolean>(false);

const cancelFocusElement = (event: MouseEvent) => {
    // 綁定click事件用，只是為了取消tooltip 在手機上的顯示
    const target = event.target as HTMLElement
}

onMounted(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    document.addEventListener('click', cancelFocusElement)
});

// 在组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('resize', checkDeviceType);
    document.removeEventListener('click', cancelFocusElement)
});

const checkDeviceType = () => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const userAgent = navigator.userAgent
    const isSmallViewport = window.innerWidth <= 999

    isMobile.value = mobileRegex.test(userAgent) || isSmallViewport
}

</script>

<template>
    <div class="flex mb-[0.5rem]">
        <!-- class="text-ellipsis overflow-hidden break-keep whitespace-nowrap" -->
        <label :for="props.for">
            <div class="flex">
                <div v-if="props.isRequired" class="text-Red" :aria-label="$t('Common.required')">
                    <span aria-hidden="true">*</span>
                </div>
                <!-- <span v-if="props.isRequired" class="text-Red" aria-hidden="true">*</span>
                <span v-if="props.isRequired"
                    class="absolute w-px h-px p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0">
                    {{ $t('Common.required') }}</span> -->
                <div class="text-h4 text-TextLevelOne">{{ props.title }}</div>
            </div>
        </label>
        <div v-if="props.iconURL">
            <span v-if="isMobile"
                v-tooltip.focus.top="{ value: $t(props.iconTooltip), pt: styleOptionTooltip, class: 'mobile:mx-[1.5rem]' }"
                tabindex="0" :aria-label="$t(props.iconTooltip)" class="flex items-center">
                <img class="cursor-pointer" :alt="props.iconAlt || $t(props.iconTooltip)"
                    :src="isHover ? props.iconHoverURL : props.iconURL" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
            </span>

            <span v-else
                v-tooltip.right="{ value: $t(props.iconTooltip), pt: styleOptionTooltip, class: 'mobile:mx-[1.5rem]' }">
                <Button
                    v-tooltip.focus.right="{ value: $t(props.iconTooltip), pt: styleOptionTooltip, class: 'mobile:mx-[1.5rem]' }"
                    :aria-label="$t(props.iconTooltip)">
                    <img class="cursor-pointer" :alt="props.iconAlt || $t(props.iconTooltip)"
                        :src="isHover ? props.iconHoverURL : props.iconURL" @mouseenter="mouseEnter"
                        @mouseleave="mouseLeave">
                </Button>
            </span>
        </div>
    </div>
    <slot></slot>
</template>
