import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as ProductsActions from '../actions/ProductsActions'
import Helmet from 'react-helmet'
import Header from '../components/Header/Header'

class HomePage extends Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Mercado Libre Argentina</title>
          <meta name="description" content="La comunidad de compra y venta online más grande de América Latina." />
        </Helmet>
        <Header {...this.props} />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  products: state.products.rows
})

const mapDispatchToProps = dispatch => ({
  getProduct: data => dispatch(ProductsActions.getProduct(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))