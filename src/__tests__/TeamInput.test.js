import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TeamInput from '../TeamInput'

jest.mock('../common/helpers', () => ({
	uuid: jest.fn().mockReturnValue('mock-id'),
}))

describe('TeamInput', () => {
	const addToList = jest.fn()
	afterEach(() => {
		addToList.mockReset()
	})
	describe('When typing', () => {
		let wrapper, inputElement
		beforeEach(() => {
			wrapper = render(<TeamInput addToList={addToList} />)
			inputElement = wrapper.getByLabelText('Add Players')
			fireEvent.change(inputElement, { target: { value: 'Mock Name' } })
		})

		it('Changes the input value', () => {
			expect(inputElement.value).toEqual('Mock Name')
		})

		describe('When Submitting', () => {
			beforeEach(() => {
				fireEvent.submit(wrapper.getByTestId('team-input'))
			})

			it('Adds the player to the list', () => {
				expect(addToList).toHaveBeenCalledTimes(1)
				expect(addToList).toHaveBeenCalledWith([
					{ name: 'Mock Name', position: 'ANY', id: 'mock-id' },
				])
			})

			it('Clears the input field', () => {
				expect(inputElement.value).toEqual('')
			})
		})
	})

	/** TODO: Figure out how to mock pasting text */
	describe.skip('When pasting text', () => {
		describe('When pasting data as a numbered list', () => {
			it('Adds all players to the list', () => {
				const { getByLabelText } = render(
					<TeamInput addToList={addToList} />
				)

				fireEvent.paste(getByLabelText('Add Players'), {
					clipBoardData: {
						getData: () => ({
							data: '1. Player Name',
							type: 'text/plain',
						}),
					},
				})
				expect(addToList).toHaveBeenCalledTimes(1)
				//expect(addToList).toHaveBeenCalledWith(List of Players)
				expect(getByLabelText('Add Players').value).toEqual('')
			})
		})
	})
})
