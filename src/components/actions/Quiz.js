import React from 'react'
import { View, StyleSheet, } from 'react-native'
import {Button, Icon, Text} from 'native-base'
import CenteredText from '../CenteredText'

const QuizActions = (props) => {
  const {questionAnswered, cardsLeft, showFeedback, incrementScore, goNext } = props
  if(questionAnswered){
    return (
      <View style={[styles.quizActions,styles.multipleButtons]}>
        <Button style={{flex: 1, marginRight: 10}} block success onPress={() => incrementScore()}><Text>Correct</Text></Button>
        <Button style={{flex: 1, marginLeft: 10}} block danger onPress={() => goNext()}><Text>Incorrect</Text></Button>
      </View>)
  } else {
    return (
      <View style={styles.quizActions}>
        <Button full onPress={() => showFeedback()}><Text>Check Answer</Text></Button>
        {cardsLeft != 0 ?
          (<CenteredText>{cardsLeft} more cards left</CenteredText>) :
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
  button: {
    flex: 1,
  }
})

export default QuizActions
