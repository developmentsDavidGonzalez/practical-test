import React from 'react'
import Search from './Search/Search'

const Header = props => (
	<header className="Header">
		<div className="container">
		<div className="row justify-content-sm-center">
				<Search {...props} />
			</div>
		</div>
	</header>
)

export default Header