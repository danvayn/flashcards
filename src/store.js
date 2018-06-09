import devToolsEnhancer from 'remote-redux-devtools';
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { createStore } from 'redux';
import rootReducer from './reducers'

export const store = createStore(
  rootReducer,
  devToolsEnhancer({ realtime: true })
);
export const persistor = persistStore(store);
