import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'

import indigo from '@material-ui/core/colors/indigo'

const List = styled(MuiList)``
const ListItem = styled(MuiListItem)`
	&:nth-child(2n + 1) {
		background-color: ${indigo[50]};
	}
	font-size: 1.1rem;
`

const TeamsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 90vw;
	grid-column-gap: 2vw;
	margin: 3rem;
`
const TeamHeading = styled.h3`
	color: ${indigo[400]};
	margin: 0;
`

const TeamList = ({ list, index }) => (
	<div>
		<TeamHeading>Team {index}</TeamHeading>
		<List>
			{list.map(listItem => (
				<ListItem key={listItem.id}>{listItem.name}</ListItem>
			))}
		</List>
	</div>
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
