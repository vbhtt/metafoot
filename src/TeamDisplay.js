import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import indigo from '@material-ui/core/colors/indigo'
import grey from '@material-ui/core/colors/grey'
import { secondaryDark } from './common/colours'

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

const TeamList = ({ list, index }) => (
	<ListContainer>
		<TeamHeading>Team {index}</TeamHeading>
		<List>
			{list.map(listItem => (
				<ListItem key={listItem.id}>{listItem.name}</ListItem>
			))}
		</List>
	</ListContainer>
)

const TeamDisplay = ({ teams }) => {
	if (!teams || teams.length < 1) return null
	return (
		<TeamsContainer>
			{teams.map((team, index) => (
				<TeamList list={team} key={index} index={index + 1} />
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
