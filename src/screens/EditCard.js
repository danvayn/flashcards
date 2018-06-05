import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Alert } from 'react-native'
import EditCardForm from '../components/forms/EditCard'
import { white, black } from '../utils/colors';
import { editCard, deleteCard } from '../actions'

class EditCard extends Component {
  state = {
    card: this.props.card
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Edit Card #${navigation.state.params.cardIndex + 1}`
  })

  onSubmit = (card) => {
    this.props.editCard(card)
    this.props.navigation.goBack();
  }

  onDelete = (cardID) => {
    Alert.alert(
      'Delete Card?',
      'Are you sure you want to delete this card?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteCard(cardID)},
      ],
      { cancelable: false }
    )
  }

  deleteCard = (cardID) => {
    this.props.deleteCard(this.props.card.id)
    this.props.navigation.goBack()
  }


  render() {

    return(
      <Container style={{flex: 1, justifyContent: 'center',}}>
        <View>
          <EditCardForm
            card={this.state.card}
            handleSubmit={this.onSubmit}
          />
        <Button full style={{marginTop: 15}} onPress={() => this.onDelete()}>
            <Text>Delete Card</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state, {navigation}){
  const {deckIndex, cardIndex} = navigation.state.params
  const deck = state.decks.list[deckIndex]
  return {
    deckID: deck.id,
    card: deck.cards[cardIndex]
  }
}

function mapDispatchToProps(dispatch, {navigation}){
    const {deckID, deckIndex, cardIndex } = navigation.state.params
  return {
    editCard: (card) => { dispatch(editCard(deckIndex, cardIndex, card))},
    deleteCard: (cardID) => { dispatch(deleteCard(deckIndex, cardID)) },
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
