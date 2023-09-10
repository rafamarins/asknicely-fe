<template>
  <UTable :columns="columns" :rows="companies">
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">No companies data!</span>
      </div>
    </template>
  </UTable>
  <UploadModal />
</template>
<script setup lang="ts">
import { useEmployeeStore } from '~/stores/employee'
const employeeStore = useEmployeeStore()
const uniqueComps = new Set(employeeStore.employees?.map((e) => e.CompanyName))
const companies = [...uniqueComps].map((c) => {
  const averageSalary = useAverage(employeeStore.employees?.filter((e) => e.CompanyName === c)?.map((e) => e.Salary))
  return {
    CompanyName: c,
    AverageSalary: averageSalary?.value?.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD' })
  }
})
const columns = [
  {
    key: 'CompanyName',
    label: 'Company name',
    sortable: true
  },
  {
    key: 'AverageSalary',
    label: 'Average Salary'
  }
]
</script>
