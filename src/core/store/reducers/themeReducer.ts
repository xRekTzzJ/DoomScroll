import { PayloadAction } from '@reduxjs/toolkit'

const themeReducer = (
	state: boolean = false,
	action: PayloadAction<boolean>
) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return action.payload
		default:
			return state
	}
}

export default themeReducer
