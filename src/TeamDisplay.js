import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

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

const colours = [['black', '#E0E0E0'], ['#f44336', '#2196F3']]

const TeamList = ({ list, index }) => (
	<ListContainer>
		<TeamHeading>Team {index + 1}</TeamHeading>
		<ColouredShirts>
			{colours[index].map(colour => (
				<ShirtIcon colour={colour} />
			))}
		</ColouredShirts>
		<List>
			{list.map(listItem => {
				const colour = positions.find(
					({ position }) => position === listItem.position
				).colour
				return (
					<ListItem key={listItem.id}>
						<PositionDot colour={colour} />
						{listItem.name}
					</ListItem>
				)
			})}
		</List>
	</ListContainer>
)

const TeamDisplay = ({ teams }) => {
	if (!teams || teams.length < 1) return null
	return (
		<TeamsContainer>
			{teams.map((team, index) => (
				<TeamList list={team} key={index} index={index} />
			))}
		</TeamsContainer>
	)
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
