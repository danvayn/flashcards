import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux'
import { Container, Content, Text, Button } from 'native-base'
import EditCardForm from '../components/forms/EditCard'
import { editCard } from '../actions'

class EditCard extends Component {
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
    this.props.dispatch(deleteCard(navigation.state.params.cardID))
    this.props.navigation.goBack();
  }


  render() {

    return(
      <Container>
        <Content padder>
          <EditCardForm
            card={this.props.card}
            handleSubmit={this.onSubmit}
          />
        <Button onPress={() => this.deleteCard()}>
            <Text>Delete Card</Text>
          </Button>
        </Content>
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
    deleteCard: (cardID) => { dispatch(deleteCard({cardID, deckID})) },
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
