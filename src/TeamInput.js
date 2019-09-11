import React, { useState } from 'react'
import MuiTextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { uuid } from './common/helpers'

const TextField = styled(MuiTextField)`
	width: 80vw;
`

const TeamInput = ({ addToList }) => {
	const [inputValue, setInputValue] = useState('')
	const handlePaste = e => {
		const listNameRegex = /^\d{1,2}. [a-zA-Z*\s]+$/gm
		const data = e.clipboardData.getData('text')
		let names = data.match(listNameRegex)
		if (!names || names.length < 1) return
		e.preventDefault()
		e.stopPropagation()
		names = names.map(name => {
			const nameRegex = /[a-zA-Z*\s]+/
			name = name.match(nameRegex)[0]
			return { name, position: 'ANY', id: uuid() }
		})
		addToList(names)
	}
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				if (inputValue) {
					addToList([
						{ name: inputValue, position: 'ANY', id: uuid() },
					])
					setInputValue('')
				}
			}}
		>
			<TextField
				id="filled-name"
				label="Add Players"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onPaste={handlePaste}
				margin="normal"
				variant="outlined"
			/>
		</form>
	)
}
export default TeamInput
