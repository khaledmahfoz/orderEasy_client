import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import './index.css'

import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary'
import App from './App'
import authReducer from './store/reducers/auth'
import coordsReducer from './store/reducers/coords'
import cartReducer from './store/reducers/cart'
import menuFormReducer from './store/reducers/MenuForm'
import menuFormItemReducer from './store/reducers/MenuFormItem'
import menuFormReviewReducer from './store/reducers/MenuFormReview'
import errorHandlerReducer from './store/reducers/errorHandler'

const rootReducer = combineReducers({
	authReducer: authReducer,
	coordsReducer: coordsReducer,
	cartReducer: cartReducer,
	menuFormReducer: menuFormReducer,
	menuFormItemReducer: menuFormItemReducer,
	menuFormReviewReducer: menuFormReviewReducer,
	errorHandlerReducer: errorHandlerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename="/">
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
