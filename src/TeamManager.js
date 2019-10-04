import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import filter from 'lodash/filter'

import { generateTeams, uuid } from './common/helpers'

import TeamInput from './TeamInput'
import MemberList from './MemberList'
import TeamDisplay from './TeamDisplay'

const testList = [
	'Pecky',
	'Rajesh',
	'David',
	'Varun',
	'Sumedh',
	'Abel',
	'Rohith',
	'Rawson',
	'Asaph',
	'Joseph',
].map(name => ({ name, position: 'ANY', id: uuid() }))

const TeamManagerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 0 64px;
`

const GenerateButton = styled(Button)`
	&.MuiButtonBase-root {
		position: fixed;
		bottom: 0;
		border-radius: 0;
		z-index: 3;
	}
	&.MuiButton-sizeLarge {
		padding: 12px 24px;
	}
`

const TeamManager = () => {
	const { list, addToList, removeFromList, updateListItemById } = useList([])
	const [teams, setTeams] = useState(null)
	return (
		<TeamManagerContainer>
			<div>
				<TeamInput addToList={addToList} />
				<MemberList
					list={list}
					removeFromList={removeFromList}
					updateListItem={(id, data) => updateListItemById(id, data)}
				/>
			</div>
			<GenerateButton
				variant="contained"
				color="primary"
				disabled={list.length < 2}
				onClick={() => {
					setTeams(generateTeams(list))
				}}
				fullWidth
				size="large"
			>
				Generate Teams
			</GenerateButton>
			<TeamDisplay teams={teams} setTeams={setTeams} />
		</TeamManagerContainer>
	)
}

const useList = initialList => {
	const [list, setList] = useState(initialList)

	/**
	 * Adds an item to the start of the list
	 * @param {Object} item The item object to add to the list
	 */
	const addToList = item => {
		setList([...item, ...list])
	}

	/**
	 * Removes an item from the list by name
	 * @param {string} name The `name` of the item to remove from the list
	 */
	const removeFromList = name =>
		setList(filter(list, item => item.name !== name))

	/**
	 * Updates a list item by id
	 * @param {string} id The id of the list item to update
	 * @param {object} data The new updated list item object
	 */
	const updateListItemById = (id, data) => {
		const index = list.findIndex(obj => obj.id === id)
		const newList = [
			...list.slice(0, index),
			Object.assign({}, list[index], data),
			...list.slice(index + 1),
		]
		setList(newList)
	}
	return { list, addToList, removeFromList, updateListItemById }
}

export default TeamManager
