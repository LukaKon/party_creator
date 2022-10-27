export const getDateObj = (date) => {

	const Y = date.slice(0, 4)
	const M = date.slice(5, 7)
	const D = date.slice(8, 10)
	const h = date.slice(11, 13)
	const m = date.slice(14, 16)
	const s = date.slice(17, 19)

	return new Date(Y, M, D, h, m, s)
}
