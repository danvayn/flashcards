import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator, createStackNavigator } from 'react-navigation'

import Modal from './components/Modal'
import DeckList from './screens/DeckList'
import AddDeck from './screens/AddDeck'
import AddCard from './screens/AddCard'
import EditCard from './screens/EditCard'
import DeckDetails from './screens/DeckDetails'
import TakeQuiz from './screens/TakeQuiz'

import { purple, white } from './utils/colors'

const NavigationStack = StackNavigator({
  Home: {
    screen: DeckList,
  },
  AddDeck: {
    screen: AddDeck
  },
  AddCard: {
    screen: AddCard
  },
  EditCard: {
    screen: EditCard
  },
  DeckDetails: {
    screen: DeckDetails
  },
  TakeQuiz: {
    screen: TakeQuiz
  },
})


const RootStack = StackNavigator(
  {
    Main: {
      screen: NavigationStack
    },
    Modal: {
      screen: Modal
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }

)

export default RootStack
// export default NavigationStack
