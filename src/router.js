import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator, createStackNavigator } from 'react-navigation'

import Settings from './screens/Settings'
import Modal from './components/Modal'
import DeckList from './screens/DeckList'
import AddDeck from './screens/AddDeck'
import AddCard from './screens/AddCard'
import DeckDetails from './screens/DeckDetails'

import { purple, white } from './utils/colors'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-settings' size={30} color={tintColor} />
    },
  },
  // Settings: {
  //   screen: Settings,
  //   navigationOptions: {
  //     tabBarLabel: 'Settings',
  //     tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
  //   },
  // },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const NavigationStack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  AddDeck: {
    screen: AddDeck
  },
  AddCard: {
    screen: AddCard
  },
  DeckDetails: {
    screen: DeckDetails
  },
})

// const RootStack = StackNavigator(
//   {
//     Main: {
//       screen: NavigationStack
//     },
//     Modal: {
//       screen: Modal
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   }
//
// )
//
// export default RootStack
export default NavigationStack
