import React from 'react'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import indigo from '@material-ui/core/colors/indigo'

const ListItem = styled(MuiListItem)`
	background-color: ${indigo[50]};
	margin: 1rem 0;
	border-radius: 8px;
`
const List = styled(MuiList)`
	width: 80vw;
`

const MemberList = ({ list, removeFromList }) => (
	<>
		<div>Players: {list.length}</div>
		<List>
			{list.map(listItem => (
				<ListItem key={listItem.id ? listItem.id : listItem.name}>
					<ListItemText primary={listItem.name}></ListItemText>
					<ListItemSecondaryAction>
						<IconButton
							edge="end"
							aria-label="comments"
							onClick={() => removeFromList(listItem.name)}
						>
							<CancelIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	</>
)
export default MemberList
