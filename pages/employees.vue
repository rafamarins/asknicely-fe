<template>
  <EmployeeTable />
</template>
<script setup lang="ts">
import { useModalStore } from '~/stores/modal'

definePageMeta({
  path: '/employees'
})

const modalStore = useModalStore()

onUnmounted(() => {
  modalStore.opened && modalStore.setModalState()
})
</script>
