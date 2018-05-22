import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers'
import devToolsEnhancer from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


export const store = createStore(
  rootReducer,
  devToolsEnhancer({ realtime: true })
);
export const persistor = persistStore(store);
