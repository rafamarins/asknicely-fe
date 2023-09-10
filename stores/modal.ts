export const useModalStore = defineStore('modal-store', {
  state: () => ({
    opened: false
  }),
  actions: {
    setModalState() {
      this.opened = !this.opened
    }
  }
})
