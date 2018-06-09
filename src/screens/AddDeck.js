import { Container } from 'native-base';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

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
