import React from 'react'
import { StyleSheet, View } from 'react-native'
import FlashCard from '../components/FlashCard'

const CardContainer = (props) => {
  const card = props.currentCard
  const flipped = props.flipCurrent
  const showEdit = props.showEdit

  return (
    <View style={{flex: 1}}>
    <View style={[{flex: 1},(props.cardStyle || {})]}>
      <FlashCard
        onPress={props.onPress}
        front={card.front}
        back={card.back}
        flipped={flipped}
        onPress={props.onPress}
      />
    </View>
    <View style={[styles.cardActions, (props.actionStyle || {})]}>
      {props.children}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
})

export default CardContainer
