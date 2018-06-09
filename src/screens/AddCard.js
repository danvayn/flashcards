import { Container, Content, Text } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import AddCardForm from '../components/forms/AddCard'
import { white, black } from '../utils/colors'
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
      <Container style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <AddCardForm
            handleSubmit={this.submit}
          />
      </View>
      </Container>
    )
  }
}

export default connect()(AddCard);
