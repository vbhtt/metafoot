import { useState } from 'react'
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

import ShareIcon from '@material-ui/icons/Share'
import Button from '@material-ui/core/Button'

const TeamsListContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 90vw;
	grid-column-gap: 2vw;
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

const PositionDot = styled.div<{ colour: string }>`
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
const TeamsContainer = styled.div`
	margin: 3rem 0;
	#share-teams {
		display: flex;
		justify-content: center;
	}
`

const positionSorting = {
	GK: 0,
	DEF: 1,
	MID: 2,
	FWD: 3,
	ANY: 4,
}

function getColour(p: Player['position']): Colour {
	return positions.find(({ position }) => position === p)?.colour ?? 'grey'
}

type TeamIndex = 0 | 1

type TeamListProps = {
	list: Player[]
	index: TeamIndex
	selectedPlayers: PlayerSelection
	changeSelectedPlayer: (player: Player, index: TeamIndex) => void
}
const TeamList = ({
	list,
	index,
	selectedPlayers,
	changeSelectedPlayer,
}: TeamListProps) => {
	const length = 2
	const otherIndex = (index + 1) % length
	const isOtherSelected = !isEmpty(selectedPlayers[otherIndex as TeamIndex])
	return (
		<ListContainer>
			<TeamHeading>Team {index + 1}</TeamHeading>
			<List>
				{list
					.sort(
						(a, b) =>
							positionSorting[a.position] -
							positionSorting[b.position]
					)
					.map(listItem => {
						const colour = getColour(listItem.position)
						const isSelected =
							selectedPlayers[index]?.id === listItem.id
						return (
							<ListItem
								key={listItem.id}
								onClick={() =>
									changeSelectedPlayer(listItem, index)
								}
								className={isSelected ? 'selected' : ''}
								button
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

type TeamDisplayProps = {
	teams: Player[][] | null
	setTeams: (teams: Player[][]) => void
}

const TeamDisplay = ({ teams, setTeams }: TeamDisplayProps) => {
	const {
		selectedPlayers,
		changeSelectedPlayer,
		resetSelectedPlayers,
	} = usePlayerSelection()

	if (
		selectedPlayers[0] !== null &&
		selectedPlayers[1] !== null &&
		teams !== null
	) {
		const _t0 = teams[0],
			_t1 = teams[1]

		remove(_t0, n => n.id === selectedPlayers[0]!.id)
		remove(_t1, n => n.id === selectedPlayers[1]!.id)

		_t0.push(selectedPlayers[1])
		_t1.push(selectedPlayers[0])

		setTeams([_t0, _t1])
		resetSelectedPlayers()
	}

	const handleShareTeams = () => {
		let sharedTeams = ''
		if (navigator.share && teams !== null) {
			for (let team in teams) {
				sharedTeams += `\nTeam ${parseInt(team) + 1}\n`
				sharedTeams = teams[team].reduce((a: string, value: Player) => {
					return a + value.name + '\n'
				}, sharedTeams)
			}
			navigator.share({ text: sharedTeams })
		}
	}

	if (!teams || teams.length < 1) return null
	return (
		<TeamsContainer>
			<TeamsListContainer>
				{teams.slice(0, 2).map((team, index) => (
					<TeamList
						list={team}
						key={index}
						index={index as TeamIndex}
						changeSelectedPlayer={changeSelectedPlayer}
						selectedPlayers={selectedPlayers}
					/>
				))}
			</TeamsListContainer>
			{typeof navigator.share === 'function' && (
				<div id="share-teams">
					<Button endIcon={<ShareIcon />} onClick={handleShareTeams}>
						Share
					</Button>
				</div>
			)}
		</TeamsContainer>
	)
}

type PlayerSelection = {
	/** Selected player in first column */
	0: Player | null

	/** Selected player in second column */
	1: Player | null
}
const usePlayerSelection = () => {
	const initialState: PlayerSelection = { 0: null, 1: null }
	const [selectedPlayers, setSelectedPlayers] = useState<PlayerSelection>(
		initialState
	)

	/**
	 * Marks a player as selected
	 * @param player The player object to mark as selected
	 * @param teamIndex The team the player is in
	 */
	const changeSelectedPlayer = (player: Player, teamIndex: TeamIndex) => {
		if (isEqual(selectedPlayers[teamIndex], player)) {
			/* Player is already selected, deselect them */
			setSelectedPlayers({ ...selectedPlayers, [teamIndex]: null })
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
export default TeamDisplay
