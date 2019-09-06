import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import TeamManager from './TeamManager'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#d36d72',
			main: '#9e3f47',
			dark: '#6b0d20',
		},
		secondary: {
			light: '#dbffff',
			main: '#a8d8ff',
			dark: '#76a7cc',
		},
	},
})

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<main>
					<TeamManager />
				</main>
			</div>
		</MuiThemeProvider>
	)
}

export default App
