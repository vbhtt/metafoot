import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { uuid } from './common/helpers'

const TextField = styled(MuiTextField)`
	width: 80vw;
`

const TeamInput = ({ addToList }) => {
	const [inputValue, setInputValue] = useState('')

	const handlePaste = e => {
		/* e.g. 4. Player Name */
		const listNameRegex = /^\d{1,2}. [\w\s+*()]+/
		const data = e.clipboardData.getData('text')
		const lines = data.split('\n')
		let names = lines
			.map(line => {
				return listNameRegex.test(line) ? line : null
			})
			.filter(Boolean)

		/* Allow normal pasting if pasted data doesn't match the format */
		if (!names || names.length < 1) return

		e.preventDefault()
		e.stopPropagation()
		names = names.map(name => {
			name = name.replace(/\d{1,2}\. /, '')
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
			data-testid="team-input"
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

TeamInput.propTypes = {
	/* Function to add the input text to the list */
	addToList: PropTypes.func,
}

export default TeamInput
