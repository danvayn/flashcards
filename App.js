import React from 'react'
import PropTypes from 'prop-types'
import { Constants } from 'expo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store';
import Navigator from './src/router';
import Loading from './src/screens/Loading'
import { blue } from './src/utils/colors'
import { removeAllDecks } from './src/actions/'
import { setLocalNotification } from './src/utils/notifications'

class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <ActionSheetProvider>
        <AppContents/>
      </ActionSheetProvider>
    )
  }
}

const AppContents = () => (
  <Provider store = {store}>
    <PersistGate loading={<Loading/>} persistor={persistor}>
      <Navigator/>
    </PersistGate>
  </Provider>)

  export default App
