export const getDateObj = (date) => {

	const Y = date.slice(0, 4)
	const M = date.slice(5, 7)
	const D = date.slice(8, 10)
	const h = date.slice(11, 13)
	const m = date.slice(14, 16)
	const s = date.slice(17, 19)

	const generated_date = new Date(Y, M, D, h, m, s)
	const date_object = {
		year: generated_date.getFullYear(),
		month: generated_date.toLocaleString('pl-PL', { month: 'long' }),
		day: generated_date.toLocaleString('pl-PL', { day: '2-digit' }),
		// TODO: format time
		hour: '',
		minute: '',
		second: '',
	}

	return date_object
}
