import React from 'react'
import { Link } from 'react-router-dom'

let state = {
	value: ''
}

const handleSubmit = event => {
	if (state.value.length < 2) {
		event.preventDefault()
	}
}

const handleChange = value => {
	state.value = value
}

const Search = props => (
	<div className="col-sm-10">
		<form className="Search" method="GET" action="/items" onSubmit={event => handleSubmit(event)}>
			<div className="form-group">
				<Link to="/"></Link>
				<input type="text" name="search" className="form-control" placeholder="Nunca dejes de buscar" defaultValue={state.value} onChange={event => handleChange(event.target.value)} />
				<button type="submit"><i className="icn"></i></button>
			</div>
		</form>
	</div>
)

export default Search