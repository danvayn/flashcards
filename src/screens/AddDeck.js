import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import { connect } from 'react-redux'
import { Left, Body, Title, Container, Header, Button, Content, Form, Item, Input, Label, Text } from 'native-base';
import { white, black } from '../utils/colors';
import { addDeck } from '../actions'

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add a Deck'
  })
  state = {
    text: ''
  }

  submit = () => {
    const title = this.state.text
    this.props.dispatch(addDeck(title))
    this.props.navigation.goBack();
  }

  render() {
    return(
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Deck Title</Label>
              <Input onChangeText={(text) => {this.setState({text})}}/>
            </Item>
            <Button onPress={this.submit} block style={{marginTop:20}}>
              <Text>
                Submit
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect()(AddDeck);
