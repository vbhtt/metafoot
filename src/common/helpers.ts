import { positions } from './data'
export const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})

/**
 * Generates two teams from a list of players
 * @param teamMembers array of team member objects
 */
export const generateTeams = (teamMembers: Player[]): Player[][] => {
	let teams: Player[][] = [[], []]
	const extras: Player[] = []
	let members = teamMembers.map(teamMember => ({
		...teamMember,
		id: uuid(),
	}))
	members = members.sort((a, b) => (a.id > b.id ? 1 : -1))
	positions.forEach(({ position }) => {
		let positionedPlayers = members.filter(
			member => member.position === position
		)
		if (positionedPlayers.length % 2 === 1) {
			extras.push(positionedPlayers[positionedPlayers.length - 1])
			positionedPlayers = positionedPlayers.slice(
				0,
				positionedPlayers.length - 1
			)
		}
		positionedPlayers.forEach((player, index) => {
			teams[index % 2].push(player)
		})
	})
	if (extras.length > 0) {
		extras.forEach((player, index) => {
			teams[index % 2].push(player)
		})
	}
	return teams
}
