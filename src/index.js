import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import App from './shared/App'
import './assets/styles/main.scss'
import createStore from './store'
import '../public/favicon.ico'

const store = createStore(window.REDUX_DATA)

const js = (
	<ReduxProvider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ReduxProvider>
)

const app = document.getElementById('root')
ReactDOM.hydrate(js, app)