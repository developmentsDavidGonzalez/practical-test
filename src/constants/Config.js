/**
 * Production Config
 */
const production = {
  /**
   * Paginator
   */
  paginator: {
    PER_PAGE: 10
  },
  /**
   * API Gateway
   */
  apiGateway: {
    DEV: 'http://52.22.141.97/api/',
    URL: 'http://52.22.141.97/api/'
  },
  /**
   * API Endpoints
   */
  endpoint: {
    PRODUCTS: ''
  },
}

/**
 * Development Config
 */
const development = {
  /**
   * Paginator
   */
  pagination: {
    PER_PAGE: 10
  },
  /**
   * API Gateway
   */
  apiGateway: {
    DEV: 'http://52.22.141.97/api/',
    URL: 'http://52.22.141.97/api/'
  },
  /**
   * API Endpoints
   */
  endpoint: {
    PRODUCTS: ''
  },
}

const config = process.env.REACT_APP_ENVIRONMENT === 'production' ? production : development

export default config