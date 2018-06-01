import React, { Component } from 'react'
import { Alert, StyleSheet, View, Platform, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from "styled-components";
import { Footer, Container, CardItem, Card, Header, Body, Title, Subtitle, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import {addOrRemove} from '../utils/helpers'
import CardDisplay from '../components/CardDisplay'
import FlashCard from '../components/FlashCard'
import { white } from '../utils/colors'
import { connectActionSheet } from '@expo/react-native-action-sheet';
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


  componentWillMount() {
     this.props.navigation.setParams({ onOpenActionSheet: this._onOpenActionSheet });
  }

  _onOpenActionSheet = () => {
    let options = ['Generate Decks', 'Delete This Deck', 'Cancel'];
    let generateDecksIndex = 0;
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

  state = {
    cardIndex: 0,
    flippedCards: [],
  }

  selectCard = (card) => {
    let flipped = this.state.flippedCards
    addOrRemove(flipped, card.id)
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
    //alert prompt, on confirm deleteDeck
  }

  render() {
    const { deckTitle, deckIndex, cards } = this.props
    const { flippedCards, cardIndex } = this.state
    const card = cards[cardIndex]

    return(
      <Container>
        <Content>
          <ListItem icon onPress={() => this.props.navigation.navigate('AddCard',{deckTitle, deckIndex})}>
            <Left>
                <Icon name="plane" />
              </Left>
              <Body>
                <Text>Add a Card</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('TakeQuiz',{deckTitle, deckIndex})}>
            <Left>
                <Icon name="plane" />
              </Left>
              <Body>
                <Text>Take a Quiz</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <Text>{cardIndex+1}/{cards.length} cards</Text>
          <CardDisplay
            flipCurrent={this.state.flippedCards.includes(card.id) ? true : false}
            currentCard={card}
          >
          </CardDisplay>
        </Content>
        <Footer>
          <Button iconLeft onPress={() => {
            if (cards[cardIndex-1] != null) {
              this.setState({...this.state, cardIndex: cardIndex-1})

            } else {
              this.setState({...this.state, cardIndex: cards.length-1})
            }
          }}>
            <Icon name="arrow-back" />
            <Text>Previous</Text>
          </Button>
          <Button onPress={() => this.selectCard(card)}>
            <Text>Flip</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('EditCard',{deckIndex, cardIndex})}>
            <Text>Edit</Text>
          </Button>
          <Button iconRight onPress={() => {
                  if (cards[cardIndex+1] != null) {
                    this.setState({...this.state, cardIndex: cardIndex+1})
                  } else {
                    this.setState({...this.state, cardIndex: 0})
                  }
              }}>
            <Text>Next</Text>
            <Icon name="arrow-forward" />
          </Button>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deckActions: {
    flex: 1,
    position: 'absolute',
    bottom:50,
    left: 0,
    right: 0,

  },
  headerTitle: {
    //TODO: figure out what constants can help here
    maxWidth: 300,
    paddingTop: 12
  },
  cardContainer: {
      padding: 15,
      flex: 1,
      // justifyContent: "center"
  }
})

const cardContainer = ({
    padding: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
