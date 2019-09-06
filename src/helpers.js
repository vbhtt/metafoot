export const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})

/**
 *
 * @param {array} teamMembers array of team member objects
 */
export const generateTeams = teamMembers => {
	let members = teamMembers.map(teamMember => ({
		...teamMember,
		id: uuid(),
	}))
	members = members.sort((a, b) => (a.id > b.id ? 1 : -1))
	const mid = members.length / 2
	const teams = [members.slice(0, mid), members.slice(mid, members.length)]
	return teams
}
