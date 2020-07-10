import React from 'react'
import { render, prettyDOM, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake, sequence, oneOf } from '@jackfranklin/test-data-bot'
import TeamDisplay from '../TeamDisplay'

describe('TeamDisplay', () => {
	const buildPlayer = build('Player', {
		fields: {
			name: fake(f => f.name.firstName()),
			id: sequence(s => `mock-id${s}`),
			position: oneOf('GK', 'DEF', 'MID', 'FWD', 'ANY'),
		},
	})
	const buildTeam = () => {
		const teamLength = 10
		const team = []
		for (let i = 0; i < teamLength; i++) {
			team.push(buildPlayer())
		}
		return team
	}
	it('Should display all players', () => {
		const teams = [buildTeam(), buildTeam()]
		const { getByText } = render(<TeamDisplay teams={teams} />)
		teams.forEach((team, index) => {
			let teamComponentUtils = within(
				getByText(`Team ${index + 1}`).parentElement
			)
			team.forEach(player => {
				expect(
					teamComponentUtils.getByText(player.name)
				).toBeInTheDocument()
			})
		})
	})
})
