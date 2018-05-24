import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableWithoutFeedback
} from 'react-native'

import { Container, Header, Button, Body, Content, Card, CardItem, Text } from 'native-base'
import { black, lightPurp } from '../utils/colors'


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

  flipCard(){
    if(this.value >= 90){
      Animated.timing(this.animatedValue,{
        toValue: 0,
        duration: 750,
      }).start()
    } else {
      Animated.timing(this.animatedValue,{
        toValue: 180,
        duration: 750,
      }).start()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.flipped !== this.props.flipped) {
      this.flipCard()
    }
}

  render(){
    const {front, back, flipped} = this.props

    const frontAnimatedStyle = { transform: [{ rotateX: this.frontInterpolate }]}
    const backAnimatedStyle = { transform: [{ rotateX: this.backInterpolate }]}

    return (
      <View>
        <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <CardItem header>
              <Text style={[styles.cardHeader, styles.questionHeader]}>Question:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.flipText}>
                  {front}
                </Text>
              </Body>
            </CardItem>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <CardItem header>
            <Text style={[styles.cardHeader, styles.answerHeader]}>Answer:</Text>
          </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.flipText}>
                 {back}
                </Text>
              </Body>
            </CardItem>
          </Animated.View>
        </View>
      )
  }

}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardHeader: {

  },
  flipCard: {
    backgroundColor: "#FDFBF2",
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    position: "absolute",
    backgroundColor: "#f1e39b",
  },
  flipText: {
    color: black
  },
})

export default FlashCard
