import { useState } from 'react'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import CancelIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Check'

import { positions } from './common/data'

const List = styled(MuiList)`
	width: 95vw;
	@media (min-width: 880px) {
		width: 500px;
	}
	.MuiOutlinedInput-input {
		padding: 6px 8px;
		max-width: 40vw;
	}
`
type PositionIndicatorProps = {
	/** The highlight colour */
	colour: string

	/** Whether the indicator is selected or not */
	isSelected: boolean
}
const PositionIndicator = styled.div<PositionIndicatorProps>`
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

type MemberListProps = {
	/** The list of players */
	list: Player[]

	/** Function to remove a player from the list */
	removeFromList: (name: Player['name']) => void

	/** Function to update player details */
	updateListItem: (id: Player['id'], changes: Partial<Player>) => void
}

/** Component to show the list of all players */
const MemberList = ({
	list,
	removeFromList,
	updateListItem,
}: MemberListProps) => {
	const [editing, setEditing] = useState<Player['id'] | null>(null)
	return (
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
						{editing === listItem.id ? (
							<ListItemText>
								<form
									onSubmit={e => {
										e.preventDefault()
										setEditing(null)
									}}
								>
									<TextField
										value={listItem.name}
										variant="outlined"
										onChange={e => {
											updateListItem(listItem.id, {
												name: e.target.value,
											})
										}}
										autoFocus={true}
									/>
								</form>
							</ListItemText>
						) : (
							<ListItemText
								primary={listItem.name}
								onClick={() => {
									setEditing(listItem.id)
								}}
							></ListItemText>
						)}
						<SecondaryActions>
							{editing !== listItem.id &&
								positions.map(({ position, colour }) => (
									<PositionIndicator
										colour={colour}
										key={position}
										onClick={() =>
											updateListItem(listItem.id, {
												position,
											})
										}
										isSelected={
											listItem.position === position
										}
									>
										{position}
									</PositionIndicator>
								))}
							{editing === listItem.id && (
								<Button
									onClick={() =>
										removeFromList(listItem.name)
									}
									endIcon={<CancelIcon />}
								>
									Remove
								</Button>
							)}
							{editing === listItem.id ? (
								<IconButton
									edge="end"
									aria-label="edit player"
									onClick={() => {
										setEditing(null)
									}}
								>
									<DoneIcon />
								</IconButton>
							) : (
								<IconButton
									edge="end"
									aria-label="edit player"
									onClick={() => {
										setEditing(listItem.id)
									}}
								>
									<EditIcon />
								</IconButton>
							)}
						</SecondaryActions>
					</ListItem>
				))}
			</List>
		</>
	)
}
export default MemberList
