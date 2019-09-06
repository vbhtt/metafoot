import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

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
			return { name }
		})
		addToList(names)
	}
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				if (inputValue) {
					addToList([{ name: inputValue }])
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
