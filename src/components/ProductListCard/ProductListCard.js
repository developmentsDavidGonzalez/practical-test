import React from 'react'

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0
})

const ProductListCard = props => (
  props.products.items.map((product, key) => (
    <div key={key} className="ProductListCard">
      <div className="row">
        <div className="col-sm-auto">
          <a href={`/items/${product.id}`}>
            <img src={product.picture} alt={product.title} />
          </a>
        </div>
        <div className="col-sm-auto">
          <p>{formatter.format(product.price.amount)} {(product.free_shipping) ? <i className="icn"></i> : ''}</p>
          <a href={`/items/${product.id}`}>
            <p>{product.title}</p>
          </a>
        </div>
      </div>
    </div>
  ))
)

export default ProductListCard