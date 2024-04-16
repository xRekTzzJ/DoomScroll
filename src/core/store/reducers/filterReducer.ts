import { PayloadAction } from '@reduxjs/toolkit'

const filterReducer = (state = 'All', action: PayloadAction<string>) => {
	switch (action.type) {
		case 'All':
			return 'All'
		case 'Feed':
			return 'Feed'
		default:
			return state
	}
}

export default filterReducer
