import { combineReducers, createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { persistReducer } from 'redux-persist'
import deckReducer from './decks'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { AsyncStorage } from 'react-native'

const deckConfig = {
  key: 'deck',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
    decks: persistReducer(deckConfig, deckReducer),
    decks: deckReducer,
})

const rootConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
}

export default persistReducer(rootConfig, rootReducer)
