import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'

import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import MuiSwapIcon from '@material-ui/icons/SwapHoriz'

import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import { secondaryDark } from './common/colours'
import { positions } from './common/data'

import ShirtIcon from './ShirtIcon'

const TeamsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 90vw;
	grid-column-gap: 2vw;
	margin: 3rem;
`
const TeamHeading = styled.h3`
	color: ${secondaryDark};
	margin: 0;
	font-weight: bolder;
	padding-left: 16px;
	font-size: 1.5rem;
`
const ListContainer = styled.div`
	&:nth-child(2) {
		border-left: 2px solid ${grey[100]};
		padding-left: 12px;
	}
`

const ColouredShirts = styled.div`
	display: flex;
	height: 48px;
	svg {
		width: 48px;
	}
`

const PositionDot = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${({ colour }) => colour};
`

const ListItem = styled(MuiListItem)`
	.MuiListItemIcon-root {
		width: 10px;
		min-width: 0;
		margin-right: 8px;
	}
	cursor: pointer;
	height: 50px;
	font-size: 1.1rem;
	.MuiListItemIcon-root.selected {
		border: 1px solid black;
		border-radius: 4px;
	}
`

const SwapIcon = styled(MuiSwapIcon)`
	color: ${grey[400]};
	&.highlighted {
		color: ${green[800]};
	}
`

const colours = [['black', '#E0E0E0'], ['#f44336', '#2196F3']]
const positionSorting = {
	GK: 0,
	DEF: 1,
	MID: 2,
	FWD: 3,
	ANY: 4,
}

const TeamList = ({ list, index, selectedPlayers, changeSelectedPlayer }) => {
	const length = 2
	const otherIndex = (index + 1) % length
	const isOtherSelected = !isEmpty(selectedPlayers[otherIndex])
	return (
		<ListContainer>
			<TeamHeading>Team {index + 1}</TeamHeading>
			{/* <ColouredShirts>
				{colours[index].map(colour => (
					<ShirtIcon colour={colour} key={colour} />
				))}
			</ColouredShirts> */}
			<List>
				{list
					.sort(
						(a, b) =>
							positionSorting[a.position] -
							positionSorting[b.position]
					)
					.map(listItem => {
						const colour = positions.find(
							({ position }) => position === listItem.position
						).colour
						const isSelected =
							selectedPlayers[index].id === listItem.id
						return (
							<ListItem
								key={listItem.id}
								onClick={() =>
									changeSelectedPlayer(listItem, index)
								}
								className={isSelected ? 'selected' : ''}
							>
								<ListItemIcon>
									<PositionDot colour={colour} />
								</ListItemIcon>
								{listItem.name}

								<ListItemSecondaryAction
									onClick={() =>
										changeSelectedPlayer(listItem, index)
									}
								>
									<SwapIcon
										className={
											isOtherSelected || isSelected
												? 'highlighted'
												: ''
										}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						)
					})}
			</List>
		</ListContainer>
	)
}

const TeamDisplay = ({ teams, setTeams }) => {
	const {
		selectedPlayers,
		changeSelectedPlayer,
		resetSelectedPlayers,
	} = usePlayerSelection()

	if (!isEmpty(selectedPlayers[0]) && !isEmpty(selectedPlayers[1])) {
		const _t0 = teams[0],
			_t1 = teams[1]

		remove(_t0, n => n.id === selectedPlayers[0].id)
		remove(_t1, n => n.id === selectedPlayers[1].id)

		_t0.push(selectedPlayers[1])
		_t1.push(selectedPlayers[0])

		setTeams([_t0, _t1])
		resetSelectedPlayers()
	}

	if (!teams || teams.length < 1) return null
	return (
		<TeamsContainer>
			{teams.map((team, index) => (
				<TeamList
					list={team}
					key={index}
					index={index}
					changeSelectedPlayer={changeSelectedPlayer}
					selectedPlayers={selectedPlayers}
				/>
			))}
		</TeamsContainer>
	)
}

const usePlayerSelection = () => {
	const initialState = { 0: {}, 1: {} }
	const [selectedPlayers, setSelectedPlayers] = useState(initialState)

	/**
	 * Marks a player as selected
	 * @param {object} player The player object to mark as selected
	 * @param {number} teamIndex The team the player is in
	 */
	const changeSelectedPlayer = (player, teamIndex) => {
		if (isEqual(selectedPlayers[teamIndex], player)) {
			/* Player is already selected, deselect them */
			setSelectedPlayers({ ...selectedPlayers, [teamIndex]: {} })
		} else {
			setSelectedPlayers({
				...selectedPlayers,
				[teamIndex]: player,
			})
		}
	}

	/**
	 * Resets the selected players to a blank state
	 */
	const resetSelectedPlayers = () => setSelectedPlayers(initialState)
	return { selectedPlayers, changeSelectedPlayer, resetSelectedPlayers }
}

TeamDisplay.propTypes = {
	teams: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				id: PropTypes.string,
				position: PropTypes.string,
			})
		)
	),
}
export default TeamDisplay
