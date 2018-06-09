import React from 'react'
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native'
import { Button, Icon, Text } from 'native-base'
import CenteredText from '../CenteredText'

class QuizActions extends React.Component {
  constructor(){
    super()
    this.value = 1
    this.state = {
      opacity: new Animated.Value(1),
      disabled: false
    }
    this.state.opacity.addListener(({value}) => {
      this.value = value
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.questionAnswered != this.props.questionAnswered && prevProps.questionAnswered == false){
      this.state.disabled = true
      Animated.sequence([
        Animated.timing(
          this.state.opacity,
          {
            toValue: 0,
            duration: 100,
          }
        ),
        Animated.timing(
          this.state.opacity,
          {
            toValue: 1,
            duration: 700,
          }
        )]
      ).start(() => this.setState({...this.state, disabled: false}))
    }
  }

  render(){
    let { opacity, disabled } = this.state
    const { questionAnswered, cardsLeft, showFeedback, incrementScore, goNext } = this.props
    if(questionAnswered){
      return (
        <Animated.View style={[{opacity: opacity}, styles.quizActions,styles.multipleButtons]}>
          <Button disabled={disabled} style={{flex: 1, marginRight: 10}} block success onPress={() => incrementScore()}><Text>Correct</Text></Button>
          <Button disabled={disabled} style={{flex: 1, marginLeft: 10}} block danger onPress={() => goNext()}><Text>Incorrect</Text></Button>
        </Animated.View>)
    } else {
      return (
        <Animated.View style={[{opacity: opacity}, styles.quizActions]}>
          <Button disabled={disabled} full onPress={() => {this.setState({...this.state, disabled: true}); showFeedback()}}><Text>Check Answer</Text></Button>
          {cardsLeft != 0 ?
            (<CenteredText>{cardsLeft} more cards left</CenteredText>) :
            (<CenteredText>This is the final card!</CenteredText>)
          }
        </Animated.View>
      )
    }
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
