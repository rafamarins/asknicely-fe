import Employee from '~/types/employee'

type State = {
  employees: [Employee] | []
  loading: boolean
}

export const useEmployeeStore = defineStore('employees', {
  state: (): State => ({
    employees: [],
    loading: false
  }),
  actions: {
    async updateEmployees() {
      const { getAll } = useEmployees()
      this.loading = true
      this.employees = await getAll()
      this.loading = false
    }
  }
})
