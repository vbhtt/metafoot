import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import {
	primary,
	primaryDark,
	primaryLight,
	secondary,
	secondaryDark,
	secondaryLight,
} from './common/colours'

import TeamManager from './TeamManager'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: primaryLight,
			main: primary,
			dark: primaryDark,
		},
		secondary: {
			light: secondaryLight,
			main: secondary,
			dark: secondaryDark,
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
