<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>
<template>
  <div>
    <ProgressSpinner class="w-[5rem] h-[5rem] " strokeWidth="5"  />
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-progress-spinner-circle) {
  stroke: #205ED5 !important;
}
</style>
