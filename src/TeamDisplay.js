import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'

import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'

import grey from '@material-ui/core/colors/grey'
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
	margin-right: 5px;
`

const ListItem = styled(MuiListItem)`
	${({ isSelected }) =>
		isSelected &&
		`
			border: 1px solid black;
			border-radius: 4px;
		`}
`

const colours = [['black', '#E0E0E0'], ['#f44336', '#2196F3']]
const positionSorting = {
	GK: 0,
	DEF: 1,
	MID: 2,
	FWD: 3,
	ANY: 4,
}

const TeamList = ({ list, index, selectedPlayers, changeSelectedPlayer }) => (
	<ListContainer>
		<TeamHeading>Team {index + 1}</TeamHeading>
		<ColouredShirts>
			{colours[index].map(colour => (
				<ShirtIcon colour={colour} key={colour} />
			))}
		</ColouredShirts>
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
					return (
						<ListItem
							key={listItem.id}
							onClick={() =>
								changeSelectedPlayer(listItem, index)
							}
							isSelected={
								selectedPlayers[index].id === listItem.id
							}
						>
							<PositionDot colour={colour} />
							{listItem.name}
						</ListItem>
					)
				})}
		</List>
	</ListContainer>
)

const TeamDisplay = ({ teams, setTeams }) => {
	const { selectedPlayers, changeSelectedPlayer } = usePlayerSelection()

	if (!isEmpty(selectedPlayers[0]) && !isEmpty(selectedPlayers[1])) {
		const _t0 = teams[0],
			_t1 = teams[1]

		remove(_t0, n => n.id === selectedPlayers[0].id)
		remove(_t1, n => n.id === selectedPlayers[1].id)

		_t0.push(selectedPlayers[1])
		_t1.push(selectedPlayers[0])

		setTeams([_t0, _t1])
		changeSelectedPlayer({}, 0)
		changeSelectedPlayer({}, 1)
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
	const [selectedPlayers, setSelectedPlayers] = useState({ 0: {}, 1: {} })
	const changeSelectedPlayer = (player, teamIndex) => {
		if (isEqual(selectedPlayers[teamIndex], player))
			setSelectedPlayers({ ...selectedPlayers, [teamIndex]: {} })
		else
			setSelectedPlayers({
				...selectedPlayers,
				[teamIndex]: player,
			})
	}
	return { selectedPlayers, changeSelectedPlayer }
}

TeamDisplay.propTypes = {
	teams: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				id: PropTypes.string,
			})
		)
	),
}
export default TeamDisplay
