import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from "styled-components";
import { DeckSwiper, Container, CardItem, Card, Header, Body, Title, Subtitle, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import {addOrRemove} from '../utils/helpers'
import FlashCard from '../components/FlashCard'
import { white } from '../utils/colors'

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle, deckIndex } = navigation.state.params

    return {
      header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
          <Title style={styles.headerTitle}>{deckTitle}</Title>
          <Right>
            <Button transparent onPress={() => navigation.navigate('AddCard',{deckTitle, deckIndex})}>}>
              <Icon name="add" />
            </Button>
          </Right>
      </Header>
    )
    }
  }

  constructor(){
    super()
  this.state = {
    flippedCards: [],
    cardIndex: 0,
  }
  }

  selectCard = (card) => {
    let flipped = this.state.flippedCards
    addOrRemove(flipped, card.id)
    this.setState({flippedCards: flipped})
  }

  render() {

    const { cards } = this.props
    const currentIndex = this.state.cardIndex
    const card = cards[currentIndex]

    return(
      <Container>
        <Content>
            { cards.length !== 0 ? (
              <View style={styles.cardContainer}>
                <FlashCard
                  front={card.front}
                  back={card.back}
                  flipped={this.state.flippedCards.includes(card.id) ? true : false}
                />
              <View style={styles.cardActions}>
                <Button iconLeft onPress={() => {
                  if (cards[currentIndex-1] != null) {
                    this.setState({...this.state, cardIndex: currentIndex-1})
                  } else {
                    this.setState({...this.state, cardIndex: cards.length-1})
                  }
                }}>
                  <Icon name="arrow-back" />
                  <Text>Previous</Text>
                </Button>
                <Button onPress={() => this.selectCard(card)}>
                  <Text>Flip Card</Text>
                </Button>
                <Button iconRight onPress={() => {
                        if (cards[currentIndex+1] != null) {
                          this.setState({...this.state, cardIndex: currentIndex+1})
                        } else {
                          this.setState({...this.state, cardIndex: 0})
                        }
                    }}>
                  <Text>Next</Text>
                  <Icon name="arrow-forward" />
                </Button>
              </View>
            }
            <Button full Primary>
              <Text>Start Quiz!</Text>
            </Button>
            <Button full Primary>
              <Text>Start Quiz!</Text>
            </Button>
          </View>
          ): (<Text>no cards in deck! add one top right</Text>)}
        </Content>
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
  deckStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  headerTitle: {
    //TODO: figure out what constants can help here
    maxWidth: 300,
    paddingTop: 12
  },
  cardContainer: {
      padding: 15,
      flex: 1,
      justifyContent: "center"
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
    cards: deck.cards
  }
}

//<FlashCard card={item}/>

export default connect(mapStateToProps)(DeckDetails);
