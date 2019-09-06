import React from 'react'
import styled from 'styled-components'

import MuiList from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import Divider from '@material-ui/core/Divider'

const List = styled(MuiList)`
	width: 80vw;
`

const MemberList = ({ list, removeFromList, condensed }) => (
	<>
		<div>
			{list.length} player{list.length !== 1 && 's'}
		</div>
		<List dense={condensed}>
			{list.map(listItem => (
				<>
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
					{!condensed && <Divider />}
				</>
			))}
		</List>
	</>
)
export default MemberList
