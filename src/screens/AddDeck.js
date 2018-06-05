import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Left, Body, Title, Container, Header, Button, Content, Form, Item, Input, Label, Text } from 'native-base';
import AddDeckForm from '../components/forms/AddDeck'
import { white, black } from '../utils/colors';
import { addDeck } from '../actions'

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add a Deck'
  })

  submit = (deck) => {
    this.props.dispatch(addDeck(deck.title))
    this.props.navigation.goBack();
  }

  render() {
    return(
      <Container>
        <View>
          <AddDeckForm
            handleSubmit={this.submit}
          />
        </View>
      </Container>
    )
  }
}

export default connect()(AddDeck);
