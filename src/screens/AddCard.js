import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux'
import { Container, Content, Text } from 'native-base'
import AddCardForm from '../components/forms/AddCard'
import { white, black } from '../utils/colors';
import { addCardToDeck } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add a Card to ${navigation.state.params.deckTitle}`
  })

  submit = (card) => {
    const index = this.props.navigation.state.params.deckIndex
    this.props.dispatch(addCardToDeck(index, card))
    this.props.navigation.goBack();
  }



  render() {
    return(
      <Container>
        <Content padder>
          <Text>{JSON.stringify(this.props)}</Text>
          <AddCardForm
            handleSubmit={this.submit}
          />
        <Text>{JSON.stringify(this.props)}</Text>
        </Content>
      </Container>
    )
  }
}

export default connect()(AddCard);
