import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TeamInput from '../TeamInput'

jest.mock('../common/helpers', () => ({
	uuid: jest.fn().mockReturnValue('mock-id'),
}))

describe('TeamInput', () => {
	const addToList = jest.fn()
	afterEach(() => {
		addToList.mockClear()
	})
	describe('When typing', () => {
		let utils, inputElement
		beforeEach(async () => {
			utils = render(<TeamInput addToList={addToList} />)
			inputElement = utils.getByLabelText('Add Players')
			await userEvent.type(inputElement, 'Mock Name')
		})

		it('Changes the input value', () => {
			expect(inputElement).toHaveValue('Mock Name')
		})

		describe('When Submitting', () => {
			beforeEach(() => {
				fireEvent.submit(utils.getByTestId('team-input'))
			})

			it('Adds the player to the list', () => {
				expect(addToList).toHaveBeenCalledTimes(1)
				expect(addToList).toHaveBeenCalledWith([
					{ name: 'Mock Name', position: 'ANY', id: 'mock-id' },
				])
			})

			it('Clears the input field', () => {
				expect(inputElement).toHaveValue('')
			})
		})
	})

	/** TODO: Figure out how to mock pasting text */
	/* https://github.com/testing-library/react-testing-library/issues/499 */
	describe.skip('When pasting text', () => {
		describe('When pasting data as a numbered list', () => {
			it('Adds all players to the list', () => {
				const { getByLabelText } = render(
					<TeamInput addToList={addToList} />
				)

				fireEvent(
					getByLabelText('Add Players'),
					new ClipboardEvent('paste', {
						clipBoardData: {
							data: '1. Player Name',
							type: 'text/plain',
						},
					})
				)
				expect(addToList).toHaveBeenCalledTimes(1)
				//expect(addToList).toHaveBeenCalledWith(List of Players)
				expect(getByLabelText('Add Players')).toHaveValue('')
			})
		})
	})
})
