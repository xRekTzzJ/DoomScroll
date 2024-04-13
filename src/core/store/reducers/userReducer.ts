import { PayloadAction } from '@reduxjs/toolkit'
import { IUserData } from '../actions'

const userReducer = (state = {}, action: PayloadAction<IUserData>) => {
	switch (action.type) {
		case 'REGISTER_NEW_USER':
			return {
				...action.payload,
			}
		case 'AUTH':
			return {
				...action.payload,
			}
		case 'LOG_OUT':
			return {
				...action.payload,
			}
		case 'LOGIN':
			return {
				...action.payload,
			}
		case 'UPDATE_USER':
			return {
				...action.payload,
			}
		default:
			return state
	}
}

export default userReducer
