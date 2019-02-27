import React from 'react'

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0
})

const ProductDetail = props => (
  <div className="row justify-content-sm-center">
    <div className="col-sm-10">
      <div className="ProductDetail">
        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid" src={props.product.item.picture} alt={props.product.item.title} />
          </div>
          <div className="col-md-4">
            <p>{(props.product.item.condition ? 'Nuevo' : 'Usado')} - {props.product.item.sold_quantity} vendidos</p>
            <h1>{props.product.item.title}</h1>
            <span>{formatter.format(props.product.item.price.amount)}</span>
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2>Descripción del producto</h2>
            <p>{props.product.item.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProductDetail