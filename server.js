import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Helmet from 'react-helmet'
import routes from './src/shared/routes'
import App from './src/shared/App'
import createStore, { initializeSession } from './src/store'
import compression from 'compression'
import axios from 'axios'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(compression())
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/api/items/search', (req, res) => {
	return axios
		.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`)
		.then(response => {
			let products = response.data
			let data = {
				author: {
					name: 'David',
					lastname: 'Gonzalez'
				}
			}
			let items = []
			products.results.forEach(element => {
				items.push({
					id: element.id,
					title: element.title,
					price: {
						currency: element.currency_id,
						amount: Math.round(element.price),
						decimals: 0
					},
					picture: element.thumbnail,
					condition: element.condition,
					free_shipping: element.shipping.free_shipping
				})
			})
			data.items = items
			let categories = []
			products.filters.forEach(element => {
				if (element.id === 'category') {
					element.values[0].path_from_root.forEach(category => {
						categories.push(category.name)
					})
				}
			})
			data.categories = categories
			res.send(data)
		})
		.catch(error => {
			res.send(error)
		})
})

let product
let picture
let description
app.get('/api/items/:id', (req, res) => {
	return axios
		.get(`https://api.mercadolibre.com/items/${req.params.id}`)
		.then(response => {
			product = response.data
			if (product.pictures.length) {
				picture = product.pictures[0].url
			} else {
				picture = product.thumbnail
			}
			return axios
				.get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
				.then(response => {
					description = response.data.plain_text
					return axios
						.get(`https://api.mercadolibre.com/categories/${product.category_id}`)
						.then(response => {
							let categories = []
							response.data.path_from_root.forEach(category => {
								categories.push(category.name)
							})
							let data = {
								author: {
									name: 'David',
									lastname: 'Gonzalez'
								},
								item: {
									id: product.id,
									title: product.title,
									price: {
										currency: product.currency_id,
										amount: Math.round(product.price),
										decimals: 0,
									},
									picture: picture,
									condition: product.condition,
									free_shipping: product.shipping.free_shipping,
									sold_quantity: product.sold_quantity,
									description: description
								},
								categories: categories
							}
							res.send(data)
						})
						.catch(error => {
							res.send(error)
						})
				})
				.catch(error => {
					res.send(error)
				})
		})
		.catch(error => {
			res.send(error)
		})
})

app.get(/(\/+items+\S*)|(\/){1}/, (req, res) => {
	const context = {}
	const store = createStore()
	store.dispatch(initializeSession())

	const dataRequirements =
		routes
			.filter(route => matchPath(req.path, route))
			.map(route => route.component)
			.filter(comp => comp.serverFetch)
			.map(comp => store.dispatch(comp.serverFetch(req)))

	Promise.all(dataRequirements).then(() => {
		try {
			const jsx = (
				<ReduxProvider store={store}>
					<StaticRouter context={context} location={req.url}>
						<App />
					</StaticRouter>
				</ReduxProvider>
			)
			const reactDom = renderToString(jsx)
			const reduxState = store.getState()
			const helmetData = Helmet.renderStatic()

			res.writeHead(200, { 'Content-Type': 'text/html' })
			res.end(htmlTemplate(reactDom, reduxState, helmetData))
		}
		catch (error) {
			console.error(error)
		}
	})
})

function htmlTemplate(reactDom, reduxState, helmetData) {
	return `
			<!DOCTYPE html>
			<html lang="es-AR">
        <head>
					<meta charSet="utf-8" />
  				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
					<meta name="HandheldFriendly" content="True" />
					<meta name="theme-color" content="#FFE600">
					${ helmetData.title.toString()}
					${ helmetData.meta.toString()}
					<link rel="shortcut icon" href="favicon.ico" />
					<link rel="stylesheet" href="/assets/styles/styles.css" />
				</head>
				<body>
					<div id="root">${reactDom}</div>
					<script>window.REDUX_DATA=${JSON.stringify(reduxState)}</script>
					<script src="/assets/scripts/bundle.js"></script>
        </body>
      </html>
    `
}

app.listen(port, () => {
	console.log(`Server run http://localhost:${port}`)
})