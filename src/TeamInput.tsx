import { useState } from 'react'
import MuiTextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { uuid } from './common/helpers'

const TextField = styled(MuiTextField)`
	width: 80vw;
`

type TeamInputProps = {
	/** Function to add players to the list */
	addToList: (names: Player[]) => void
}

type ExcludesFalsy = <T>(x: T | null | undefined | false) => x is T

function TeamInput({ addToList }: TeamInputProps) {
	const [inputValue, setInputValue] = useState('')

	const handlePaste = (e: React.ClipboardEvent) => {
		/* e.g. 4. Player Name */
		const listNameRegex = /^\d{1,2}. [\w\s+*()]+/
		const data = e.clipboardData.getData('text')
		const lines = data.split('\n')

		let namesList = lines
			.map(line => {
				return listNameRegex.test(line) ? line : null
			})
			.filter((Boolean as any) as ExcludesFalsy)

		/* Allow normal pasting if pasted data doesn't match the format */
		if (namesList.length < 1) return

		e.preventDefault()
		e.stopPropagation()
		const names = namesList.map<Player>(name => {
			// Remove serial number from start of name
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

export default TeamInput
