import { Alert, StyleSheet, View, Platform, FlatList } from 'react-native'
import { Container, Button, Icon, List, ListItem, Text } from 'native-base'
import { connect } from 'react-redux'
import React from 'react'

import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { shuffleArray } from '../utils/helpers'


import CardContainer from '../containers/Card'
import CenteredText from '../components/CenteredText'
import QuizActions from '../components/actions/Quiz'

class TakeQuiz extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const title = navigation.state.params.title || 'Test your knowledge!'
    return {
      title: title,
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      ),
    }
  }

  state = {
    currentScore: 0,
    currentTotal: 0,
    cardIndex: 0,
    cards: this.props.cards,
    questionAnswered: false,
  }

  showResults = () => {
    clearLocalNotification().then(setLocalNotification)
    Alert.alert(
      `Quiz Complete!`,
      `You got ${this.state.currentScore}/${this.state.cards.length} cards right!
      Would you like to take it over?`,
      [
        {text:'Yes', onPress: () => this.resetQuiz()},
        { text:'No', onPress: () => this.props.navigation.goBack(), style: 'cancel' }
      ],
      { onDismiss: () => {this.props.navigation.goBack()}}
    )
  }

  resetQuiz = () => {
    const shuffledCards = shuffleArray(this.state.cards) //shuffle Cards here
    this.setState({cardIndex: 0, cards: shuffledCards, questionAnswered: false, currentScore: 0, currentTotal: 0})
  }

  showFeedback = () => {
    this.setState({...this.state, questionAnswered: true})
  }
  incrementScore = () => {
    const nextScore = this.state.currentScore + 1
    this.setState({...this.state,currentScore: nextScore }, () => {this.goNext()})
  }
  incrementTotal = () => {
    const nextTotal = this.state.currentTotal + 1
    this.setState({...this.state, currentTotal: nextTotal })
  }
  goNext = () => {
    const nextIndex = this.state.cardIndex + 1
    if(this.state.cards[nextIndex]){
      this.setState({ ...this.state, questionAnswered: false, cardIndex: nextIndex },
        () => {this.incrementTotal()})
    } else {
      this.setState({ ...this.state, questionAnswered: false }, () => {this.incrementTotal()})
      this.showResults()
    }
  }

  render(){
    const { cards, cardIndex } = this.state
    return(
      <Container>
        <View style={styles.deckDisplay}>
          { this.state.cardIndex > 0 ? (
            <CenteredText>Score: { this.state.currentScore }/{this.state.currentTotal}</CenteredText>
            ) : (<CenteredText>Answer the prompts below to progress.</CenteredText>)
          }

          <CardContainer
            flipCurrent={this.state.questionAnswered}
            currentCard={cards[cardIndex]}
          >
            <QuizActions
              incrementScore={this.incrementScore}
              goNext={this.goNext}
              showFeedback={this.showFeedback}
              questionAnswered={this.state.questionAnswered}
              cardsLeft={this.state.cards.length-this.state.cardIndex}
            />
          </CardContainer>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  deckDisplay: {
    padding: 20,
    backgroundColor: "#FDFBF2",
    flex: 1,
  },
})



function mapStateToProps(state, {navigation}){
  const deck = state.decks.list[navigation.state.params.deckIndex]
  return {
    deckID: deck.id,
    deckTitle: deck.title,
    deckIndex: navigation.state.params.deckIndex,
    cards: shuffleArray(deck.cards),
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  return {
    recordQuiz: ({quiz}) => { dispatch(saveQuiz(quiz)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz)
