import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const TeamInput = ({ addToList }) => {
	const [inputValue, setInputValue] = useState('')
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				if (inputValue) {
					addToList({ name: inputValue })
					setInputValue('')
				}
			}}
		>
			<TextField
				id="filled-name"
				label="Add Player"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				margin="normal"
				variant="outlined"
			/>
		</form>
	)
}
export default TeamInput
