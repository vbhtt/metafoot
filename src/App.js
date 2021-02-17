import React, { useEffect, useState } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import {
	primary,
	primaryDark,
	primaryLight,
	secondary,
	secondaryDark,
	secondaryLight,
} from './common/colours'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'

import TeamManager from './TeamManager'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

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
	const [isSnackbarOpen, setSnackbarOpen] = useState(false)
	const [waitingWorker, setWaitingWorker] = useState(null)
	useEffect(() => {
		serviceWorkerRegistration.register({
			onUpdate: registration => {
				setWaitingWorker(registration?.waiting)
			},
		})
	}, [])

	useEffect(() => {
		if (waitingWorker) {
			setSnackbarOpen(true)
		}
	}, [waitingWorker])

	function handleClose() {
		setSnackbarOpen(false)
	}
	function updateServiceWorker() {
		if (waitingWorker) {
			waitingWorker.postMessage({ type: 'SKIP_WAITING' })
			window.location.reload()
		}
	}
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<main>
					<TeamManager />
				</main>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={isSnackbarOpen}
				autoHideDuration={null}
				onClose={handleClose}
				message="A new version of this app is availables"
				action={
					<Button
						color="secondary"
						size="small"
						onClick={updateServiceWorker}
					>
						Update
					</Button>
				}
			/>
		</MuiThemeProvider>
	)
}

export default App
