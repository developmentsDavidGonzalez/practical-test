import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section id="wrapper" className="error-page">
    <div className="error-box">
      <div className="error-body text-center">
        <h1 className="text-info">404</h1>
        <h3 className="text-uppercase">PÁGINA NO ENCONTRADA</h3>
        <Link to="/" className="btn btn-info btn-rounded waves-effect waves-light m-b-40">Volver al inicio</Link>
      </div>
      <footer className="footer text-center">© 2019 Mercado Libre.</footer>
    </div>
  </section>
)

export default NotFoundPage