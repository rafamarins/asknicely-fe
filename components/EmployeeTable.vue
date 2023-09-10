<template>
  <UButton v-if="!!employeeStore.employees?.length" label="Add employees" @click="modalStore.setModalState" />
  <UTable :columns="columns" :rows="employeeStore.employees" :loading="employeeStore.loading">
    <template #Salary-data="{ row }">
      {{ row.Salary.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD' }) }}
    </template>
    <template #Email-data="{ row }">
      <span v-if="editEmployee !== row.ID">{{ row.Email }}</span>
      <button
        v-if="editEmployee !== row.ID"
        @click="
          () => {
            editEmployee = row.ID
            email = row.Email
          }
        "
      >
        <svg class="h-4 w-4 ml-1 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <form v-if="editEmployee === row.ID" @submit.prevent>
        <input
          v-model="email"
          class="px-1 text-black border-2 rounded-md border-solid border-gray-400 bg-gray-100 dark:bg-white"
          type="text"
        />
        <button type="submit" @click.prevent="updateEmplyee(row.ID, row.Email)">
          <svg
            class="h-4 w-4 text-black dark:text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </button>
      </form>
    </template>
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">No employees data!</span>
        <UButton label="Add employees" @click="modalStore.setModalState" />
      </div>
    </template>
    <template #loading-state>
      <div class="flex items-center justify-center h-32">
        <i class="loader --3" />
      </div>
    </template>
  </UTable>
  <UploadModal />
</template>
<script setup lang="ts">
import { useEmployeeStore } from '~/stores/employee'
import { useModalStore } from '~~/stores/modal'

const employeeStore = useEmployeeStore()
const modalStore = useModalStore()
const editEmployee = ref(null)
const email = ref('')

const columns = [
  {
    key: 'ID',
    label: 'ID',
    sortable: true
  },
  {
    key: 'CompanyName',
    label: 'Company name',
    sortable: true
  },
  {
    key: 'EmployeeName',
    label: 'Employee name'
  },
  {
    key: 'Email',
    label: 'Email'
  },
  {
    key: 'Salary',
    label: 'Salary'
  }
]

const updateEmplyee = async (ID: number, prevEmail: string) => {
  if (email.value !== prevEmail) {
    const { data, error } = await useAsyncData('file-upload', () =>
      $fetch(`https://local.api.asknicely.com/api/employees/${ID}`, { method: 'PATCH', body: { email: email.value } })
    ).catch((e) => console.error(e))

    if (error.value) throw error

    if (data.value) {
      employeeStore.updateEmployees()
    }
  }
  editEmployee.value = null
  email.value = ''
}
</script>
