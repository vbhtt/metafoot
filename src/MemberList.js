import React from 'react'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

const List = styled(MuiList)`
	width: 95vw;
	@media (min-width: 880px) {
		width: 500px;
	}
`
const PositionIndicator = styled.div`
	height: 30px;
	width: 40px;
	border-radius: 8px;
	font-size: 1rem;
	border: 1px solid ${({ colour }) => colour};
	color: ${({ colour, isSelected }) => (isSelected ? 'white' : colour)};
	background-color: ${({ colour, isSelected }) =>
		isSelected ? colour : 'white'};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`
const SecondaryActions = styled(ListItemSecondaryAction)`
	display: flex;
	align-items: center;
	> * {
		margin: 4px;
	}
`

const positions = [
	{ position: 'GK', colour: '#FF8F00' },
	{ position: 'DEF', colour: '#F9A825' },
	{ position: 'MID', colour: '#4CAF50' },
	{ position: 'FWD', colour: '#2196F3' },
]

const MemberList = ({ list, removeFromList, updateListItem }) => (
	<>
		<div>
			{list.length} player{list.length !== 1 && 's'}
		</div>
		<List>
			{list.map(listItem => (
				<ListItem key={listItem.id}>
					<ListItemText primary={listItem.name}></ListItemText>
					<SecondaryActions>
						{positions.map(({ position, colour }) => (
							<PositionIndicator
								colour={colour}
								key={position}
								onClick={() =>
									updateListItem(listItem.id, { position })
								}
								isSelected={listItem.position === position}
							>
								{position}
							</PositionIndicator>
						))}
						<IconButton
							edge="end"
							aria-label="Remove Player"
							onClick={() => removeFromList(listItem.name)}
						>
							<CancelIcon />
						</IconButton>
					</SecondaryActions>
				</ListItem>
			))}
		</List>
	</>
)
export default MemberList
