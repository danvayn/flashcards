import React from 'react'
import { View, StyleSheet, } from 'react-native'
import {Button, Icon, Text} from 'native-base'
import CenteredText from '../CenteredText'

const QuizActions = (props) => {
  if(props.questionAnswered){
    return (
      <View style={[styles.quizActions,styles.multipleButtons]}>
        <Button success onPress={() => props.incrementScore()}><Text>Correct</Text></Button>
        <Button danger onPress={() => props.goNext()}><Text>Incorrect</Text></Button>
      </View>)
  } else {
    return (
      <View style={styles.quizActions}>
        <Button full onPress={() => props.showFeedback()}><Text>Check Answer</Text></Button>
        {props.cardsLeft != 0 ?
          (<CenteredText>{props.cardsLeft} more cards left</CenteredText>) :
          (<CenteredText>This is the final card!</CenteredText>)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quizActions: {
    flex: 1,
    width: 300,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  multipleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default QuizActions
