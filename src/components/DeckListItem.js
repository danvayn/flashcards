import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { white, gray } from '../utils/colors'
import CenteredText from './CenteredText'

const DeckListItem = (props) => {
  const {deck, onPress} = props
  return (
    <TouchableOpacity style={styles.deckItem} onPress={onPress}>
        <CenteredText style={styles.deckTitle}>{deck.title}</CenteredText>
        <CenteredText style={styles.deckSubtitle}>{deck.cards.length} cards</CenteredText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  deckItem: {
    padding: 20,
    backgroundColor: white,
  },
    deckTitle: {
      fontSize: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    deckSubtitle: {
      fontSize: 10,
      marginTop: 2,
      fontSize: 11,
      color: gray,
    }
})

export default DeckListItem
