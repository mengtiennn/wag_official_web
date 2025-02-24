<script lang="ts" setup>
import Checkbox from "primevue/checkbox";
const props = defineProps({
    value: {
        type: Boolean
    },
    binary: {
        type: Boolean,
        default: true
    },
    inputId: {
        type: String
    },
    name: {
        type: String
    }
})
</script>
<template>
    <Checkbox
        :value="props.value"
        :inputId="props.inputId"
        :name="props.name"
        :binary="props.binary"
        :pt="{
            root: {
                class: ['w-[16px]', 'h-[16px]'],
            },
            box: ({ props, context }) => ({
                class: [
                // Size
                'w-[16px]',
                'h-[16px]',

                // Shape
                'rounded-[2px]',
                'border',

                // Colors
                {
                    'border-Input': !context.checked && !props.invalid,
                    'border-Primary bg-Primary': context.checked,
                },

                // Invalid State
                { 'border-Red': props.invalid },

                // States
                {
                    'peer-hover:border-Hover':
                    !props.disabled && !context.checked && !props.invalid,
                    'peer-hover:bg-Hover peer-hover:border-Hover':
                    !props.disabled && context.checked,
                    'peer-focus-visible:border-Red peer-focus-visible:ring-2 peer-focus-visible:ring-Red':
                    !props.disabled,
                    'cursor-default bg-DisableBG': props.disabled,
                },
                ],
            }),
            input: {
                class: ['peer', 'rounded-[2px]', 'border'],
            },
        }"
    >
        <template #icon>
            <img src="@/assets/icon/checkIcon.svg" alt="" :aria-hidden="true" />
        </template>
    </Checkbox>
</template>