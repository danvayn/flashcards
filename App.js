import React from 'react'
import PropTypes from 'prop-types'
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store';
import Navigator from './src/router';
import { blue } from './src/utils/colors'
import { removeAllDecks } from './src/actions/'

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends React.Component {
  componentDidMount(){
    // removeAllDecks()
    // fetchDecks().then

    // setLocalNotification()
  }

  render() {
    return (
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator/>
        </PersistGate>
      </Provider>
    );
  }
};
