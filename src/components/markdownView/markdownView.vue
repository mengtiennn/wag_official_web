<script lang="ts" setup>
import { ref, watch } from 'vue';
import { VMarkdownView, VMarkdownEditor } from 'vue3-markdown'
import '@/plugins/vue_markdown_style.css'

const props = defineProps({
    content: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        default: 'light'
    },
    isView: {
        type: Boolean,
        default: true
    },
    device: {
        type: String,
        default: 'web'
    }
})

const upload = (file) => {
    console.log("upload", file);
}
let c = ref(props.content)

watch(() => props.content,
    (newValue, oldValue) => {
        c.value = newValue;
    }
)
const emit = defineEmits(['update:modelValue'])



watch(() => c.value,
    (newValue, oldValue) => {
        emit('update:modelValue', newValue)
    }
)

</script>

<template>
    <VMarkdownView v-if="props.isView" :mode="props.mode" :content="c" :device="props.device" tabindex="0"
        :class="{ '!text-WordLevel1 !text-body1': props.device == 'app' }">
    </VMarkdownView>
    <VMarkdownEditor v-if="props.isView == false" :upload-action="upload" v-model="c"> </VMarkdownEditor>
</template>

<style lang="scss" scoped>
.markdown-body {
    @apply text-TextLevelOne text-body2;

    h1 {
        @apply text-h1
    }

    h2 {
        @apply text-h2
    }

    h3 {
        @apply text-h3
    }

    h4 {
        @apply text-h4
    }

    h5 {
        @apply text-h5
    }
}
</style>