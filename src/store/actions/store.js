export const UPDATE_STORE = 'UPDATE_STORE'

export const updateStore = (vars) => {
  return {
    type: UPDATE_STORE,
    vars
  }
}
