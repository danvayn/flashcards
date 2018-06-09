import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity
} from 'react-native'
import CenteredText from './CenteredText'

import { Container, Header, Button, Body, Content, Card, CardItem, Text } from 'native-base'
import { lightRed,lightGreen, red, green, black, white } from '../utils/colors'


class FlashCard extends Component {

  constructor(){
    super()
    this.value = 0
    this.frontInterpolate = this.state.degree.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.state.degree.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    this.state.degree.addListener(({value}) => {
      this.value = value
    })
  }

  state = {
    degree: new Animated.Value(0),
    bounceValue: new Animated.Value(1),
  }

  flipCard(duration=750){
    if(this.value >= 90){
      Animated.timing(this.state.degree,{
        toValue: 0,
        duration: duration,
      }).start()
    } else {
      Animated.timing(this.state.degree,{
        toValue: 180,
        duration: duration,
      }).start()
    }
  }

  popCard(duration=200){
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: duration, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.flipped !== this.props.flipped) {
      if(prevProps.cardID !== this.props.cardID) {
      //if the only prop that changed was flipped, flip card
        // if the id changed, do an animation that flips the card
        Animated.sequence([
          this.flipCard(1),
          this.popCard()
        ])
    } else {
    this.flipCard()
    }
  } else if(prevProps.cardID !== this.props.cardID){
    this.popCard()
  }
}

  render(){
    const {front, back, onPress, flipped, onLongPress} = this.props

    const frontAnimatedStyle = { transform: [{ rotateX: this.frontInterpolate }, {scale: this.state.bounceValue}]}
    const backAnimatedStyle = { transform: [{ rotateX: this.backInterpolate }, {scale: this.state.bounceValue}]}

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <View>
        <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <CardItem header style={styles.cardItemReset}>
              <Text style={[styles.cardHeader, styles.questionHeader]}>Question:</Text>
            </CardItem>
            <CardItem style={styles.cardItemReset}>
              <Text style={styles.flipText}>
                {front}
              </Text>
            </CardItem>
            {onPress && (
              <CardItem footer style={styles.cardItemReset}>
                <CenteredText>Long Press the card to edit it.
                  {'\n'} Press the card to flip it.</CenteredText>
              </CardItem>
            )}
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <CardItem style={styles.cardItemReset} header>
            <Text style={[styles.cardHeader, styles.answerHeader]}>Answer:</Text>
          </CardItem>
            <CardItem style={styles.cardItemReset}>
              <Text style={styles.flipText}>
               {back}
              </Text>
            </CardItem>
            {onPress && (
              <CardItem footer style={styles.cardItemReset}>
                <CenteredText>Long Press the card to edit it.
                  {'\n'} Press the card to flip it.</CenteredText>
              </CardItem>
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>
      )
  }

}

const styles = StyleSheet.create({
  cardItemReset: {
    backgroundColor:'rgba(0,0,0,0)',
  },
  cardHeader: {
    fontSize: 15,
  },
  questionHeader: {
    color: green,
  },
  answerHeader: {
    color: red,
  },
  flipCard: {
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: '#d6d7da',
    backgroundColor: lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
  },
  flipCardBack: {
    backgroundColor: lightRed,
    position: "absolute",
  },
  flipText: {
    margin:10,
    color: black,
    fontSize: 30,
    textAlign:'center'
  },
})

export default FlashCard
