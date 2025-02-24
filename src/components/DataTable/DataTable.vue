<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {tooltipStyle, paginatorStyle, tableStyle} from '@/composables/styles';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
const props = defineProps({
    loading: {
        type: Boolean,
    },
    columnData: {
        type: Array<any>
    },
    selectedItem: {
        type: Array<any>
    },
    tableData: {
        type: Array<any>
    },
    hasChackbox: {
        type: Boolean,
        default: false
    },
    paginatorData: {
        type: Object,
    },
    hasFilter: {
        type: Boolean,
    },
    files: {
        type: Array
    },
    scrollHeight: {
        type: String,
        required: false
    },
    customStyle: {
        type: Object,
        required: false
    },
    headerArrowIcon: {
        type: Boolean,
        default: true
    }
})
const selected = computed({
    get: () => props.selectedItem,
    set: (val) =>{
        emit('update:selection', val)
    }
})
const emit = defineEmits(['onPageChange', 'update:selection', 'eventImageClick', 'eventRowClick', 'eventSort'])
const pageChange = (event,) => {
  emit('onPageChange',event)
}
const showArrow = ref(false)
const eventCurrentImage = async(item) => {
    emit('eventImageClick', item)
}
const onRowClick = (e, ) => {
    if(!e.originalEvent.srcElement.classList.contains('ImgPreview')) {
        emit('eventRowClick',e)
    }
}
const onSorted = (sort) => {
    console.log(sort)
    emit('eventSort', sort)
}
const scrollEvnent = (e) => {
    const wrapper = document.querySelector('.tableWapper')
    console.log(wrapper.clientWidth + e.target.scrollLeft , e.target.scrollWidth)
    if(wrapper.clientWidth + e.target.scrollLeft >= e.target.scrollWidth){
        showArrow.value = false
    } else {
        showArrow.value = true
    }
}
watch(()=>props.tableData, (v)=>{
    nextTick(()=>{
        const wrapper = document.querySelector('.tableWapper')
        const table = wrapper.querySelector('.filterTable')
        showArrow.value =  table.clientWidth > wrapper.clientWidth
    })
})
onMounted(()=>{
    nextTick(()=>{
        const wrapper = document.querySelector('.tableWapper')
        wrapper.addEventListener('scroll', scrollEvnent)
    })
})
</script>
<template>
    <DataTable v-model:selection="selected" :loading="props.loading" :value="tableData" :rowHover="true"
        v-bind="props" class="rounded-[4px] overflow-hidden" scrollable :scrollHeight="props.scrollHeight" :pt="customStyle ?? tableStyle" 
        selectionMode="multiple" 
        @rowClick="onRowClick"  @sort="onSorted"
    >
        <template #header v-if="showArrow && props.headerArrowIcon"><img src="@/assets/img/Header.png" alt="" /></template>
        <Column selectionMode="multiple" frozen headerStyle="width: 3rem" v-if="props.hasChackbox" />
        <Column v-for="col in columnData" :headerStyle="col.headerStyle" :field="col.sortable ? `sort_${col.key}` : col.key" :header="col.label" :sortable="col.sortable"
            v-bind="col.props">
            <template #sorticon="{sorted, sortOrder}">
                <span class="w-[1rem] ml-1">
                    <img src="@/assets/icon/ic_sorter.svg" v-if="!sorted && sortOrder == 0"/>
                    <span v-else class="w-[1rem] flex justify-center">
                        <img src="@/assets/icon/arrow_down.svg" class="w-[8px]" v-if="sorted && sortOrder == 1"/>
                        <img src="@/assets/icon/arrow_down.svg" v-else-if="sorted && sortOrder == -1" class="w-[8px] rotate-180"/>
                    </span>
                </span>
            </template>
            <template #body="{data}">
                    <slot :name="col.key" :data="data[col.key]">
                        <template v-if="col.key == 'fileResources'">
                            <img src="@/assets/img/img.png" v-tooltip.top="{value: '查看圖片', pt: tooltipStyle}" alt="查看圖片" class="ImgPreview cursor-pointer" v-if="data.fileResources && data.fileResources.length > 0" @click="eventCurrentImage(data)"/>
                        </template>
                        <template v-else>
                            <span class="inline-block whitespace-nowrap truncate max-w-[12rem] align-middle" v-tooltip.top="{value: `${data[col.key]}`, pt: tooltipStyle}">
                                <span class="InnerText">{{ data[col.key] }}</span>
                            </span>
                        </template>
                    </slot>
            </template>
        </Column>
        <slot></slot>
        <template #empty=>
            <div v-if="props.hasFilter" class="flex flex-col items-center">
                <img src="@/assets/img/empty.svg" class="ml-[-5px]" width="120" alt="" />
                <p class="text-h3 text-TextLevelOne m-2">查無資料</p>
                <p>請換個篩選條件再試試看</p>
            </div>
            <div v-else class="flex flex-col items-center">
                <img src="@/assets/img/empty.svg" class="ml-[-5px]" width="120" alt="" />
                <p class="text-h3 text-TextLevelOne m-2">尚無資料</p>
            </div>
        </template>
    </DataTable>
    <div class="flex justify-end bg-white">
        <Paginator v-if="props.paginatorData && props.paginatorData.totalRows > 1"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput"
            @page="pageChange" :rows="props.paginatorData.pageRows" :totalRecords="props.paginatorData.totalRows"
            :rowsPerPageOptions="[10,20,30,40,50]" :pt="paginatorStyle">
            <template #start>
                共{{ props.paginatorData.totalRows }}筆
            </template>
        </Paginator>
    </div>

</template>
<style lang='scss'>
.p-paginator-page-input{
    input{
        text-align: center;
        border-radius: 4px;
            outline: 1px solid #e5e7eb;
            &:focus{
            outline-color: #205ed5;
        }
    }
    &[data-pc-name="jumptopageinput"]{
        display: flex;
        align-items: center;
        gap: 5px;
        &:before{
            content: '跳至'
        }
        &:after{
            content: '頁'
        }
    }
}
</style>