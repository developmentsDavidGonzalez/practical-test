import HomePage from '../pages/HomePage'
import SearchResultPage from '../pages/SearchResultPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import NotFoundPage from '../pages/NotFoundPage'

const routes = [
	{
		path: '/',
		component: HomePage,
		exact: true
	},
	{
		path: '/items',
		component: SearchResultPage,
		exact: true
	},
	{
		path: '/items/:id',
		component: ProductDetailPage,
		exact: true
	},
	{
		component: NotFoundPage
	}
]

export default routes
