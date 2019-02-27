import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as ProductsActions from '../actions/ProductsActions'
import Header from '../components/Header/Header'
import Helmet from 'react-helmet'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ProductDetail from '../components/ProductDetail/ProductDetail'

class ProductDetailPage extends Component {

  constructor(props) {
    super(props)
    this.formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: this.props.product.item.price.currency,
      minimumFractionDigits: this.props.product.item.price.decimals
    })
  }

  static serverFetch(req) {
    return ProductsActions.getProduct({ id: req.url.replace('/items/', '') })
  }

  render() {
    return (
      <div>
        <Header />
        <Breadcrumbs products={this.props.product} />
        <div className="container">
          <Helmet>
            <title>{`${this.props.product.item.title} - ${this.formatter.format(this.props.product.item.price.amount)} en Mercado Libre Argentina`}</title>
            <meta name="description" content={`Compralo en Mercado Libre a ${this.formatter.format(this.props.product.item.price.amount)}  - Comprá en 12 cuotas ${(this.props.product.item.free_shipping ? '- Envío gratis.' : '')} .Encontrá más productos de ${this.props.product.categories[0]}, ${this.props.product.categories[1]}`} />
          </Helmet>
          <ProductDetail {...this.props} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.row
})

const mapDispatchToProps = dispatch => ({
  getProduct: data => dispatch(ProductsActions.getProduct(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage))