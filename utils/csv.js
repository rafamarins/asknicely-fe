export const readCSV = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = (e) => {
			const csvdata = e.target.result
			const data = getParsecsvdata(csvdata) // calling function for parse csv data
			data.shift() // lets remove the headers
			resolve(JSON.stringify(data))
		}

		reader.onerror = (err) => reject(err)

		reader.readAsBinaryString(file)
	})
}

const validateCSV = (csv) => {
	const expectedHeaders = ['Company Name', 'Employee Name', 'Email Address', 'Salary']
	if (!validHeaders(expectedHeaders, csv[0])) throw new Error('Invalid csv headers')
}

const validHeaders = (expected, received) => {
	if (expected.length !== received.length) return false

	for (let i = 0; i < expected.length; i++) {
		if (expected[i] !== received[i]) return false
	}

	return true
}

const getParsecsvdata = (data) => {
	const parsedata = []

	const newLinebrk = data.split('\n')
	for (let i = 0; i < newLinebrk.length; i++) {
		parsedata.push(newLinebrk[i].split(','))
	}

	validateCSV(parsedata)

	return parsedata
}
