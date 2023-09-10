<script setup>
const items = [
  {
    label: 'Employees'
  },
  {
    label: 'Companies'
  }
]

const route = useRoute()
const router = useRouter()

const selected = computed({
  get() {
    const index = items.findIndex((item) => item.label.toLocaleLowerCase() === route.path.replace('/', ''))

    return index
  },
  set(value) {
    router.push(items[value].label.toLocaleLowerCase())
  }
})
</script>

<template>
  <UTabs v-model="selected" :items="items" class="pb-4" />
</template>
