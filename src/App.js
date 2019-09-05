import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import TeamManager from './TeamManager'

function App() {
	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">MetaFoot</Typography>
				</Toolbar>
			</AppBar>
			<main>
				<TeamManager></TeamManager>
			</main>
		</div>
	)
}

export default App
