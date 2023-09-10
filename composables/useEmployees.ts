import Employee from '~/types/employee'

export const useEmployees = () => {
  const getAll = async (): Promise<[Employee] | []> => {
    const { data, error } = await useAsyncData('get-employees', () =>
      $fetch('https://local.api.asknicely.com/api/employees')
    ).catch((e) => console.error(e))

    // if (error.value) throw error

    // Lets map out just the relevant Employee fields for now
    let employees = null
    if (data?.value) {
      employees = data?.value?.map((e: Employee) => {
        return {
          ID: e.ID,
          CompanyName: e.CompanyName,
          EmployeeName: e.EmployeeName,
          Email: e.Email,
          Salary: e.Salary
        }
      })
    }

    return (employees as [Employee]) || []
  }

  return {
    getAll
  }
}
