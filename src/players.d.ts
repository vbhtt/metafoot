type Player = {
	/** Player Name */
	name: string
	/** Player Position */
	position: Position
	/** Unique ID */
	id: string
}

type Position = 'GK' | 'DEF' | 'MID' | 'FWD' | 'ANY'
type Colour = string
