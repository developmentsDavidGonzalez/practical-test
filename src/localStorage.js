export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null) {
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (error) {
    return undefined
  }
}

export const getData = (index) => {
  try {
    const serializedData = localStorage.getItem([index])
    if (serializedData === null) {
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (error) {
    return undefined
  }
}

export const saveState = (state) => {

  try {
    if (state && state.users && state.users.token) {
      localStorage.setItem('user', JSON.stringify(state.users.row))
      localStorage.setItem('token', JSON.stringify(state.users.token))
    }
    // localStorage.setItem('state', JSON.stringify(state))
  } catch (error) {
    console.log('saveState error:', error)
  }

}

export const resetState = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.log('resetState error:', error)
  }
}
