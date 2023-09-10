<template>
  <UModal v-model="modalStore.opened" :on-close="onClose">
    <div class="p-5">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          :class="{
            'flex flex-col items-cente justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600': true,
            'border-gray-300': !error,
            'border-red-500 dark:border-red-500': error
          }"
          @dragover.prevent
          @dragenter.prevent="onDragEnter"
          @dragleave.prevent
          @drop.prevent="onDrop"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">CSV (MAX. 2Mb)</p>
            <p v-if="error" class="mt-2 text-xs text-red-500">Error: {{ errorMessage }}</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" @change.prevent="onChange" />
        </label>
      </div>
      <p v-for="(file, key) in addedFiles" :key="key" class="text-black flex items-center pt-2">
        {{ file.name }}
        <svg
          v-if="file.uploaded"
          class="h-5 w-5 text-green-500 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </p>
    </div>
  </UModal>
</template>
<script setup>
import { useEmployeeStore } from '~/stores/employee'
import { useModalStore } from '~~/stores/modal'
const employeeStore = useEmployeeStore()
const modalStore = useModalStore()
const error = ref(false)
const errorMessage = ref()
const addedFiles = ref([])

const processFile = async (formData) => {
  const body = { employees: formData }

  const { data, error } = await useAsyncData(
    'file-upload',

    () => $fetch('https://local.api.asknicely.com/api/employees', { method: 'post', body })
  ).catch((e) => console.error(e))

  // server error
  if (error?.value) {
    showError({ ...error })
  }

  if (data.value) {
    addedFiles.value[addedFiles.value.length - 1].uploaded = true
    await employeeStore.updateEmployees()
  }
}

const onDragEnter = () => {
  error.value = false
}

const handleFile = async (file) => {
  addedFiles.value.push({ name: file.name, uploaded: false })
  const fileData = await readCSV(file).catch((e) => {
    console.error(e)
    error.value = true
  })
  fileData && processFile(fileData)
}

const onChange = async (e) => {
  error.value = false

  if (validateInput(e)) {
    const file = e.target.files[0]
    await handleFile(file)
  }
}

const onDrop = async (e) => {
  error.value = false

  if (validateInput(e, true)) {
    const file = e.dataTransfer.files[0]

    await handleFile(file)
  }
}

const validateInput = (e, drop = false) => {
  let file = null
  if (drop) {
    file = e?.dataTransfer?.files[0]
    const filesCount = e?.dataTransfer?.files?.length
    if (filesCount > 1) {
      error.value = true
      errorMessage.value = 'Too many files.'
      return false
    }
  } else {
    file = e?.target?.files[0]
  }

  if (!file?.name?.match(/.+(\.csv)$/)) {
    error.value = true
    errorMessage.value = 'Not a CSV file.'
    return false
  }

  const size = (file.size / 1024 / 1024).toFixed(2)

  if (size > 2) {
    error.value = true
    errorMessage.value = 'File size exceeded.'
    return false
  }

  return true
}

const onClose = () => {
  addedFiles.value = []
  error.value = false
}
// bit of a hack to reset the necessary properties, as Nuxt's UI onClose method
// isn't being called on close
watch(modalStore, () => !modalStore.opened && onClose())
</script>
