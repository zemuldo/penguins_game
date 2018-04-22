import {UPDATE_STORE} from '../actions/store'

const store = {
  played:0,
  chopped:0
}

const varsReducer = (state = store, action) => {
  switch (action.type) {
    case UPDATE_STORE:
      return Object.assign({}, state, action.vars)
    default:
      return state
  }
}

export default varsReducer
