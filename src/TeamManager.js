import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import filter from 'lodash/filter'

import { generateTeams } from './helpers'

import TeamInput from './TeamInput'
import MemberList from './MemberList'
import TeamDisplay from './TeamDisplay'

const testList = [
	{ name: 'Pecky' },
	{ name: 'Rajesh' },
	{ name: 'David' },
	{ name: 'Varun' },
	{ name: 'Sumedh' },
	{ name: 'Abel' },
	{ name: 'Rohith' },
	{ name: 'Rawson' },
	{ name: 'Asaph' },
	{ name: 'Joseph' },
]

const TeamManagerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 0 16px;
`

const GenerateButton = styled(Button)`
	&.MuiButtonBase-root {
		position: fixed;
		bottom: 0;
		border-radius: 0;
	}
	&.MuiButton-sizeLarge {
		padding: 12px 24px;
	}
`

const TeamManager = () => {
	const [list, addToList, removeFromList] = useList()
	const [teams, setTeams] = useState(null)
	const [interactedSection, setInteracted] = useState('memberList')
	return (
		<TeamManagerContainer>
			<div onClick={() => setInteracted('memberList')}>
				<TeamInput addToList={addToList} />
				<MemberList
					list={list}
					removeFromList={removeFromList}
					condensed={interactedSection !== 'memberList'}
				/>
			</div>
			<GenerateButton
				variant="contained"
				color="primary"
				disabled={list.length < 2}
				onClick={() => {
					setInteracted('teamList')
					setTeams(generateTeams(list))
				}}
				fullWidth
				size="large"
			>
				Generate Teams
			</GenerateButton>
			<TeamDisplay teams={teams} />
		</TeamManagerContainer>
	)
}

const useList = () => {
	const [list, setList] = useState(testList)
	const addToList = item => {
		setList([...item, ...list])
	}
	const removeFromList = name =>
		setList(filter(list, item => item.name !== name))
	return [list, addToList, removeFromList]
}

export default TeamManager
