import React from 'react'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

import { positions } from './common/data'

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
	border: 1px solid
		${({ colour, isSelected }) => (isSelected ? colour : '#909090')};
	color: ${({ isSelected }) => (isSelected ? 'white' : '#909090')};
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
		margin: 2px;
	}
`
const ListHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 8px 52px 2px 16px;
`

const MemberList = ({ list, removeFromList, updateListItem }) => (
	<>
		<ListHeader>
			<div>
				{list.length} player{list.length !== 1 && 's'}
			</div>
			<div>Position</div>
		</ListHeader>
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
