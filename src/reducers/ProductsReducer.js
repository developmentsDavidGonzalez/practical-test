import { ProductsActions } from '../constants/ActionTypes'

const initialState = {
	row: {
		author: {
			name: '',
			lastname: ''
		},
		categories: [

		],
		items: [
			{
				id: '',
				title: '',
				price: {
					currency: '',
					amount: '',
					decimals: ''
				},
				picture: '',
				condition: '',
				free_shipping: ''
			}
		]
	}
}

export function ProductsReducer(state = initialState, action) {

	switch (action.type) {

		/**
		 * GET Products
		 */
		case ProductsActions.GET_PRODUCTS_REQUEST:
			return {
				...state
			}

		case ProductsActions.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				// row: action.payload,
				row: action.payload
			}

		case ProductsActions.GET_PRODUCTS_FAILURE:
			return {
				...state,
				row: state
			}

		/**
		 * GET Products for edit
		 */
		case ProductsActions.EDIT_PRODUCTS_REQUEST:
			return {
				...state
			}

		case ProductsActions.EDIT_PRODUCTS_SUCCESS:
			return {
				...state,
				row: action.payload
			}

		case ProductsActions.EDIT_PRODUCTS_FAILURE:
			return {
				...state,
				row: {}
			}

		default:
			return state

	}

}
