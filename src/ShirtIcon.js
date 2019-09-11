import React from 'react'
import PropTypes from 'prop-types'

const ShirtIcon = ({ colour, strokeColour }) => (
	<svg
		data-name="Layer 1"
		id="Layer_1"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title />
		<path
			fill={colour}
			d="M14.43,3l-.29.49a2.5,2.5,0,0,1-4.29,0L9.57,3H6.76L2,5.38V11H6V21H18V11h4V5.38L17.24,3Z"
		/>
	</svg>
)
ShirtIcon.propTypes = {
	colour: PropTypes.string,
}
export default ShirtIcon
