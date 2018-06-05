import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'

import { Container, Header, Button, Body, Content, Card, CardItem, Text } from 'native-base'
import { black, white } from '../utils/colors'


class FlashCard extends Component {

  componentWillMount(){
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({value}) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }

  flipCard(duration=750){
    if(this.value >= 90){
      Animated.timing(this.animatedValue,{
        toValue: 0,
        duration: duration,
      }).start()
    } else {
      Animated.timing(this.animatedValue,{
        toValue: 180,
        duration: duration,
      }).start()
    }
  }

  flipCardInstantly(){
    if(this.value >= 90){
      Animated.timing(this.animatedValue,{
        toValue: 0,
        // duration: 1,
      }).start()
    } else {
      Animated.timing(this.animatedValue,{
        toValue: 180,
        duration: 1,
      }).start()
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.flipped !== this.props.flipped) {
      if(prevProps.front === this.props.front) {
      //if the only prop that changed was flipped, flip card
      this.flipCard()
    } else {
      Animated.sequence([
        this.flipCard(1),
      ])
    }
    }
}

  render(){
    const {front, back, onPress, flipped} = this.props

    const frontAnimatedStyle = { transform: [{ rotateX: this.frontInterpolate }]}
    const backAnimatedStyle = { transform: [{ rotateX: this.backInterpolate }]}

    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View>
        <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <CardItem header>
              <Text style={[styles.cardHeader, styles.questionHeader]}>Question:</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.flipText}>
                {front}
              </Text>
            </CardItem>
            {onPress && (
              <CardItem footer>
                <Text>Press the card to edit it.</Text>
              </CardItem>
            )}
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <CardItem header>
            <Text style={[styles.cardHeader, styles.answerHeader]}>Answer:</Text>
          </CardItem>
            <CardItem>
              <Text style={styles.flipText}>
               {back}
              </Text>
            </CardItem>
            {onPress && (
              <CardItem footer>
                <Text>Press the card to edit it.</Text>
              </CardItem>
            )}
          </Animated.View>
        </View>
        </TouchableWithoutFeedback>
      )
  }

}

const styles = StyleSheet.create({
  cardHeader: {

  },
  flipCard: {
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: '#d6d7da',
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
  },
  flipCardBack: {
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
