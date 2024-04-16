import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articleReducer from './reducers/articleReducer'
import articlesReducer from './reducers/articlesReducer'
import filterReducer from './reducers/filterReducer'
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
	articles: articlesReducer,
	article: articleReducer,
	user: userReducer,
	theme: themeReducer,
	filter: filterReducer,
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
