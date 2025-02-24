<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { computed } from 'vue';
import { SideBarModel } from './sideBar.model';
const props = defineProps({
    visible: {
        type: Boolean
    },
    header: {
        type: String
    },
    showActions: {
        type: Boolean
    }, 
    contents: {
        type: SideBarModel
    }
})
const sidebarPt = {
    root: 'w-[35%] bg-white h-[calc(100%-64px)]',
    header: 'flex justify-between bg-[#F2F3F7] text-TextLevelOne py-[0.75rem] px-[1.5rem]',
    title: '!text-h3',
    mask: '!bg-transparent !items-end',
    content: 'p-[24px] pb-[100px]'
}
const emit = defineEmits(['update:modelValue', 'eventImageClick'])

const isVisible = computed({
    get: ()=>props.visible,
    set: (v)=>{
        emit('update:modelValue', v)
    }
})
</script>
<template>
    <Sidebar v-model:visible="isVisible" :header="props.header" blockScroll position="right" :pt="sidebarPt">
        <slot name="content">
            <div class="text-h4 text-TextLevelOne flex items-center gap-2 mb-[1rem]">
                <span class="w-[4px] h-[16px] bg-Primary block"></span>
                {{ props.contents.subTitle }}
            </div>
            <div class="flex flex-col gap-1">
                <div v-for="row in props.contents.contents">
                    <label class="text-body3 text-TextLevelTwo" >{{row.label}}</label>
                    <div class="text-body3 text-TextLevelOne grid grid-cols-4 gap-[4px] " v-if="row.key == 'fileResources'" >
                        <div class="pb-[100%] h-0 overflow-hidden relative rounded-[6px] cursor-pointer	hover:after:block hover:after:absolute hover:after:w-full hover:after:h-full hover:after:bg-gray-100/75" v-for="path in row.content" @click="$emit('eventImageClick', row.content)">
                            <img :src="path" class="absolute top-[50%] l-0 translate-y-[-50%]"/>
                        </div>
                    </div>
                    <div class="text-body3 text-TextLevelOne" v-else>{{ row.content }}</div>
                </div>
            </div>
        </slot>
        <div v-if="showActions" class="absolute bottom-0 left-0 right-0 bg-white flex py-[1rem] px-[1.5rem] justify-end border border-top-[1px]">
            <slot name="footerAction"></slot>
        </div>
    </Sidebar>
</template>