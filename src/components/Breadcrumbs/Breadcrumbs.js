import React from 'react'

const Breadcrumbs = props => (
  <div className="container">
    <div className="row justify-content-sm-center">
      <div className="col-sm-10">
        <div className="row">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {
                props.products.categories.map((category, key) => (
                  <li key={key} className="breadcrumb-item">{category}</li>
                ))
              }
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
)

export default Breadcrumbs