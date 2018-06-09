import { StackNavigator, createStackNavigator } from 'react-navigation'
import React from 'react'

import DeckList from './screens/DeckList'
import AddDeck from './screens/AddDeck'
import AddCard from './screens/AddCard'
import EditCard from './screens/EditCard'
import DeckDetails from './screens/DeckDetails'
import TakeQuiz from './screens/TakeQuiz'

import { purple, white } from './utils/colors'

const NavigationStack = StackNavigator(
  {
    DeckList: {
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
  }, {
    initialRouteName: 'DeckList'
  }

)

export default NavigationStack
