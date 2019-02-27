import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as ProductsActions from '../actions/ProductsActions'
import Helmet from 'react-helmet'
import Header from '../components/Header/Header'
import ProductListCard from '../components/ProductListCard/ProductListCard'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

class SearchResultPage extends Component {

  static serverFetch(req) {
    return ProductsActions.getProductsSearch(req.query)
  }

  render() {
    return (
      <div>
        <Header />
        <Breadcrumbs {...this.props} />
        <div className="container">
          <Helmet>
            <title>{`${this.props.products.categories[0]} en Mercado Libre Argentina`}</title>
            <meta name="description" content={`${this.props.products.categories[0]} en Mercado Libre Argentina`} />
          </Helmet>
          <div className="row justify-content-sm-center">
            <div className="col-sm-10">
              {<ProductListCard {...this.props} />}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  products: state.products.row
})

const mapDispatchToProps = dispatch => ({
  getProductsSearch: data => dispatch(ProductsActions.getProductsSearch(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultPage))