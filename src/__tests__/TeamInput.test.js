import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent, { specialChars } from '@testing-library/user-event'

import TeamInput from '../TeamInput'

// jest.mock('../common/helpers', () => ({
// 	uuid: jest.fn().mockReturnValue('mock-id'),
// }))

describe('TeamInput', () => {
	const addToList = jest.fn()
	afterEach(() => {
		addToList.mockClear()
	})
	describe('When typing', () => {
		it('Changes the input value', async () => {
			render(<TeamInput addToList={addToList} />)
			const inputElement = screen.getByLabelText('Add Players')
			await userEvent.type(inputElement, 'Mock Name')
			expect(inputElement).toHaveValue('Mock Name')
		})

		describe('When typing and pressing `enter`', () => {
			it('Adds the player to the list', () => {
				render(<TeamInput addToList={addToList} />)
				const inputElement = screen.getByLabelText('Add Players')
				userEvent.type(inputElement, `Mock Name${specialChars.enter}`)

				expect(addToList).toHaveBeenCalledTimes(1)
				const uuidv4 = new RegExp(
					/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
				)
				// Added to list with proper uuid
				expect(uuidv4.test(addToList.mock.calls[0][0][0].id)).toEqual(
					true
				)
			})

			it('Clears the input field', () => {
				render(<TeamInput addToList={addToList} />)
				const inputElement = screen.getByLabelText('Add Players')
				userEvent.type(inputElement, `Mock Name${specialChars.enter}`)
				expect(inputElement).toHaveValue('')
			})
		})
	})

	/** TODO: Figure out how to mock pasting text */
	/* https://github.com/testing-library/react-testing-library/issues/499 */
	describe('When pasting text', () => {
		describe('When pasting data as a numbered list', () => {
			it('Adds all players to the list', () => {
				render(<TeamInput addToList={addToList} />)

				const lines = [
					'Saturday morning',
					'Andrews 7-8',
					'',
					'1. David',
					'2. Asaph',
					'3. Varun',
					'4. Sashank',
					'5. Sid',
					'6. Roshan',
					'7. Andrew',
					'8. Abel',
					'9. Sumedh',
					'10. Madhi',
					'11. Desmond',
					'12. Mmehak',
					'',
					'Waitlist',
					'Sashank+1',
				]

				const textData = lines.reduce(
					(acc, value) => acc + '\n' + value,
					''
				)

				const clipboardEvent = new Event('paste', {
					bubbles: true,
					cancelable: true,
					composed: true,
				})

				// set `clipboardData` and `getData` properties. Set your mocked properties here
				clipboardEvent['clipboardData'] = {
					getData: () => textData,
				}

				fireEvent(screen.getByLabelText('Add Players'), clipboardEvent)
				expect(addToList).toHaveBeenCalledTimes(1)
				//expect(addToList).toHaveBeenCalledWith(List of Players)
				expect(screen.getByLabelText('Add Players')).toHaveValue('')
			})
		})
	})
})
