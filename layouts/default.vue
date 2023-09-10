<template>
  <div class="p-8">
    <Navigation />
    <slot />
  </div>
</template>
<script setup>
import { useEmployeeStore } from '~/stores/employee'
const employeeStore = useEmployeeStore()
await employeeStore.updateEmployees()
</script>
