import { combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import { persistReducer } from 'redux-persist'
import deckReducer from './decks'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { AsyncStorage } from 'react-native'



// import navigationReducer from './navigation/'
// import { decks, navigation } from './'

const deckConfig = {
  key: 'deck',
  storage: AsyncStorage,
}

// const rootConfig = {
//   key: 'root',
//   storage,
//   debug: true,
  // blacklist: ['navigation']
// }

const rootReducer = combineReducers({
    // navigation: navigation,
    decks: persistReducer(deckConfig, deckReducer),
    decks: deckReducer,
})

const rootConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  // blacklist: ['navigation']
}
// export default rootReducer

export default persistReducer(rootConfig, rootReducer)
