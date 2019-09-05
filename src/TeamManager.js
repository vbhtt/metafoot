import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import filter from 'lodash/filter'

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

const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})

const generateTeams = teamMembers => {
	let members = teamMembers.map(teamMember => ({
		...teamMember,
		id: uuid(),
	}))
	members = members.sort((a, b) => (a.id > b.id ? 1 : -1))
	const mid = members.length / 2
	const teams = [members.slice(0, mid), members.slice(mid, members.length)]
	return teams
}

const TeamManagerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const TeamManager = () => {
	const [list, addToList, removeFromList] = useList()
	const [teams, setTeams] = useState(null)
	return (
		<TeamManagerContainer>
			<TeamInput addToList={addToList} />
			<MemberList list={list} removeFromList={removeFromList} />
			<Button
				variant="contained"
				color="primary"
				disabled={list.length < 2}
				onClick={() => setTeams(generateTeams(list))}
			>
				Generate Teams
			</Button>
			<TeamDisplay teams={teams} />
		</TeamManagerContainer>
	)
}

const useList = () => {
	const [list, setList] = useState(testList)
	const addToList = item => {
		setList([item, ...list])
	}
	const removeFromList = name =>
		setList(filter(list, item => item.name !== name))
	return [list, addToList, removeFromList]
}

export default TeamManager
