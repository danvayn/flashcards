import { Container, Body, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base'
import { Alert, StyleSheet, View, Platform, FlatList } from 'react-native'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux'
import React, { Component } from 'react'

import CardContainer from '../containers/Card'
import FlashCard from '../components/FlashCard'
import CenteredText from '../components/CenteredText'
import CardActions from '../components/actions/Card'
import TextButton from '../components/TextButton'

import { white } from '../utils/colors'
import {addOrRemove} from '../utils/helpers'
import { deleteDeck } from '../actions'

@connectActionSheet
class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: params.deckTitle,
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      ),
      headerRight: (
        <Button transparent onPress={() => params.onOpenActionSheet()}>
          <Icon name="more" />
        </Button>
      )
    }
  }

  state = {
    cardIndex: 0,
    flippedCards: [],
  }

  componentDidMount() {
     this.props.navigation.setParams({ onOpenActionSheet: this._onOpenActionSheet });
  }
  componentDidUpdate() {
    if(this.props.cards.length > 0 && this.props.cards[this.state.cardIndex] === undefined){
      if(this.props.cards[this.state.cardIndex-1] === undefined){
        this.setState({...this.state, cardIndex: 0})
      } else {
        this.setState({...this.state, cardIndex: this.state.cardIndex-1})
      }
    }
  }

  onFlip = (id) => {
    let flipped = this.state.flippedCards
    addOrRemove(flipped, id)
    this.setState({flippedCurrent: flipped})
  }

  onDelete = () => {
    Alert.alert(
      `Delete Deck`,
      `Are you sure you want to do this?`,
      [
        {text: 'Yes', onPress: () => {this.props.deleteDeck(); this.props.navigation.goBack()}},
        { text:'No', onPress: () => console.log("exited alert"), style: 'cancel' }
      ],
      { onDismiss: () => console.log("dismissed")}
    )
  }

  onNext = () => {
    const nextIndex = this.state.cardIndex + 1
    if (this.props.cards[nextIndex] != null) {
      this.setState({...this.state, cardIndex: nextIndex})
    } else {
      this.setState({...this.state, cardIndex: 0})
    }
  }

  onPrevious = () => {
    const previousIndex = this.state.cardIndex - 1
    if (this.props.cards[previousIndex] != null) {
      this.setState({...this.state, cardIndex: previousIndex})

    } else {
      this.setState({...this.state, cardIndex: this.props.cards.length-1})
    }
  }

  render() {
    const { deckTitle, deckIndex } = this.props
    const { flippedCards, cardIndex } = this.state
    const card = this.props.cards[this.state.cardIndex]


    return(
      <Container>
          <ListItem icon onPress={() => this.props.navigation.navigate('AddCard',{deckTitle, deckIndex})}>
            <Left>
                <Icon name="create" />
              </Left>
              <Body>
                <Text>Add a Card</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          {this.props.cards.length > 0 &&
            <ListItem icon onPress={() => this.props.navigation.navigate('TakeQuiz',{deckTitle, deckIndex})}>
              <Left>
                  <Icon name="bookmarks" />
                </Left>
                <Body>
                  <Text>Take a Quiz</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
            </ListItem>
          }
          <View style={styles.deckContainer}>
          {card ?
            (<View style={styles.deckDisplay}>
              <CenteredText style={styles.progressDisplay}>Card {this.state.cardIndex+1} out of the {this.props.cards.length} in this deck.</CenteredText>
              <CardContainer
                flipCurrent={this.state.flippedCards.includes(card.id) ? true : false}
                currentCard={card}
                onPress={() => this.onFlip(card.id)}
                onLongPress={() => this.props.navigation.navigate('EditCard',{deckIndex, cardIndex})}
              >
                <CardActions onPrevious={this.onPrevious} onNext={this.onNext} onFlip={() => this.onFlip(card.id)}/>
              </CardContainer>
            </View>
            ) : (
              <View>
                <TextButton style={{textAlign: 'center', fontSize: 20}} onPress={() => this.props.navigation.navigate('AddCard',{deckTitle, deckIndex})}>
                  Hey! Press here to add a new card to this deck.
                </TextButton>
              </View>
            )
          }
        </View>
      </Container>
    )
  }

  _onOpenActionSheet = () => {
    let options = ['Delete all cards', 'Delete This Deck', 'Cancel'];
    let deleteAllCardsIndex = 0;
    let deleteThisDeckIndex = 1;
    let cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions({
      options,
      deleteThisDeckIndex,
      cancelButtonIndex
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case deleteThisDeckIndex:
          this.onDelete()
      }
    });
  }
}

const styles = StyleSheet.create({
  deckDisplay: {
    padding: 20,
    flex: 1,
    backgroundColor: "#FDFBF2",
  },

  deckContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: "#FDFBF2",
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDisplay: {
    marginBottom: 10,
  }
})

function mapStateToProps(state, {navigation}){
  const deck = state.decks.list[navigation.state.params.deckIndex]
  return {
    deckTitle: deck.title,
    deckID: deck.id,
    deckIndex: navigation.state.params.deckIndex,
    cards: deck.cards,
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  const deckIndex = navigation.state.params.deckIndex
  return {
    deleteDeck: () => dispatch(deleteDeck(deckIndex))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
