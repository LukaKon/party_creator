import React from 'react'
import { Typography } from '@mui/material'
import { getDateObj } from '../../utils/getDateObj'

export const CreateUpdateDate = (props) => {
	const { entities } = props

	const created_date = getDateObj(entities.created)
	const day = created_date.day
	const month = created_date.month
	const year = created_date.year

	let modified = false
	let update_day
	let update_month
	let update_year

	if (entities.created.slice(0, 20) !== entities.updated.slice(0, 20)) {
		const updated_date = getDateObj(entities.updated)

		update_day = updated_date.day
		update_month = updated_date.month
		update_year = updated_date.year

		modified = true
	}
	return (
		<p>
			Created: {day} {month} {year} {modified
				&& `updated: ${update_day} ${update_month} ${update_year}`} by: {entities.user.email}
		</p>
	)
}
