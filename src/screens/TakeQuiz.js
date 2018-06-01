import React from 'react'
import { Alert, StyleSheet, View, Platform, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux';
import CardDisplay from '../components/CardDisplay'
import { Container, CardItem, Card, Header, Body, Title, Subtitle, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import { saveQuiz } from '../actions/index'

class TakeQuiz extends React.Component {
  state = {
    currentScore: 0,
    cardIndex: 0,
    cards: this.props.cards,
    showAnswer: false,
  }

  showResults = () => {
    //show results modal, on modal exit go back to deck
    console.log("lol")
    Alert.alert(
      `Quiz Complete!`,
      `You got ${this.state.currentScore}/${this.state.cards.length} cards right!
      Would you like to take it over?`,
      [
        {text: 'Yes', onPress: () => this.resetQuiz()},
        { text:'No', onPress: () => this.props.navigation.goBack(), style: 'cancel' }
      ],
      { onDismiss: () => {this.props.navigation.goBack()}}
    )
  }

  resetQuiz = () => {
    const cards = this.state.cards //shuffle Cards here
    this.setState({cardIndex: 0, cards: cards, showAnswer: false, currentScore: 0})
  }

  showAnswer = () => {
    this.setState({...this.state, showAnswer: true})
  }
  countCorrect = () => {
    const nextScore = this.state.currentScore + 1
    this.setState({...this.state, currentScore: nextScore }, () => {this.goNext()})
  }
  goNext = () => {
    const nextIndex = this.state.cardIndex + 1
    if(this.state.cards[nextIndex]){
    this.setState({...this.state, showAnswer: false, cardIndex: nextIndex})
    }
    else {
      this.showResults()
    }
  }

  render(){
    const {cards, cardIndex} = this.state
    return(
      <Container>
        <Content>
          <Text>{ this.state.currentScore }/{this.state.cards.length}</Text>

          <CardDisplay
            flipCurrent={this.state.showAnswer}
            currentCard={cards[cardIndex]}
          >
          </CardDisplay>
          { this.state.showAnswer ? (    <View>
                <Button onPress={() => this.countCorrect()}><Text>Correct</Text></Button>
                <Button onPress={() => this.goNext()}><Text>Incorrect</Text></Button>
              </View>):(<Button onPress={() => this.showAnswer()}><Text>Show Answer</Text></Button>) }
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state, {navigation}){
  const deck = state.decks.list[navigation.state.params.deckIndex]
  return {
    deckID: deck.id,
    deckTitle: deck.title,
    deckIndex: navigation.state.params.deckIndex,
    cards: deck.cards,
  }
}

function mapDispatchToProps(dispatch, {navigation}){

    // PopulateDecks, also have cards
    //deleteDecks
  return {
    recordQuiz: ({quiz}) => { dispatch(saveQuiz(quiz)) },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz)
