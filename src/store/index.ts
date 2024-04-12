import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articleReducer from './articleReducer'
import articlesReducer from './articlesReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
	articles: articlesReducer,
	article: articleReducer,
	user: userReducer,
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
export type AppDispatch = typeof store.dispatch
