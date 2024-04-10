import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articlesReducer from './articlesReduser'

const reducer = combineReducers({
	atricles: articlesReducer,
})

export const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).prepend(thunk),
})

export type RootState = ReturnType<typeof store.getState>
