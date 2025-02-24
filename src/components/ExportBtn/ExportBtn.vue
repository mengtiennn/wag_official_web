<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { computed, defineExpose } from "vue";

const toast = useToast();
const items = computed(() =>
  props.includeCsv
    ? [
        { label: "CSV", key: "csv" },
        { label: "Excel", key: "Excel" },
      ]
    : [{ label: "Excel", key: "Excel" }]
);
const emit = defineEmits(["click"]);
const props = defineProps({
  class: {
    type: String
  },
  select: {
    type: [Object, String, Number],
  },
  isDisabled: {
    type: Boolean,
  },
  includeCsv: {
    type: Boolean,
    default: true,
  },
});
const change = (v) => {
  emit("click", v.value);
  toast.add({ severity: "info", summary: "提醒", detail: "檔案下載中" });
};
const clear = () => {
  console.log("clear");
  toast.removeAllGroups();
};
defineExpose({ clear });
</script>
<template>
  <Dropdown
    :options="items"
    optionLabel="label"
    placeholder="導出"
    :disabled="props.isDisabled"
    @change="change"
    :pt="{
      root: `${props.isDisabled ? 'bg-DisableBG' : 'bg-Primary'} ${props.class}`,
      input: `text-body3 ${
        props.isDisabled ? '!text-DisableText' : '!text-white'
      }`,
      trigger: `text-white w-[1.2rem] pr-2 ${
        props.isDisabled ? '!text-DisableText' : '!text-white'
      }`,
      panel: 'text-body3',
    }"
  />
  <Toast position="bottom-right" />
</template>