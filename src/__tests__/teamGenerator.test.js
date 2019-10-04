import { generateTeams, uuid } from '../common/helpers'

describe('Team Generator Function', () => {
	describe('When number of team members is even', () => {
		const testList = [
			'Name1',
			'Name2',
			'Name3',
			'Name4',
			'Name5',
			'Name6',
			'Name7',
			'Name8',
		].map(name => ({ name, position: 'ANY', id: uuid() }))
		it('Generates two teams of equal length', () => {
			const teams = generateTeams(testList)
			expect(teams.length).toEqual(2)
			expect(teams[0].length).toEqual(teams[1].length)
		})
	})
	describe('When number of team members is odd', () => {
		const testList = [
			'Name1',
			'Name2',
			'Name3',
			'Name4',
			'Name5',
			'Name6',
			'Name7',
		].map(name => ({ name, position: 'ANY', id: uuid() }))
		it('Generates two teams with the difference in length of 1', () => {
			const teams = generateTeams(testList)
			expect(teams.length).toEqual(2)
			expect(Math.abs(teams[0].length - teams[1].length)).toEqual(1)
		})
	})
})
