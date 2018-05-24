import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import TextButton from '../components/TextButton'
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {green} from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


class DeckList extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
          <Left/>
          <Body><Title>Deck List</Title></Body>
          <Right>
            <Button transparent>
            <Icon name='menu'/>
          </Button>
          </Right>
      </Header>
  )})
  state = {
    selected: ''
  }

  componentDidMount(){

  }

  selectDeck = (title, index) => {

    this.props.navigation.navigate(
              'DeckDetails',
              { deckTitle: title, deckIndex: index }
            )
  }

  onDelete = () => {
    return
  }

  renderDeck = ({item, index}) => {
    return(
      <ListItem icon marginBottom={10}
        selected={this.state.selected === item.title}
        onPress={() => this.selectDeck(item.title, index)}
      >
        <Left><Icon name='pizza'/></Left>
        <Body><Text>{item.title}</Text></Body>
        <Right><Icon name='pizza'/></Right>
      </ListItem>
    )
  }

  render() {
    const { decks } = this.props

    return(
      <Container>
        <Content padder>
          <ListItem selected
            onPress={() => this.props.navigation.navigate('AddDeck',{})}>
          <Text>Add a new Deck</Text>
        </ListItem>
          <FlatList
            data={decks}
            renderItem={this.renderDeck}
            keyExtractor={item => item.title}
          />
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {

  return {
    decks: state.decks.list
  }
}

export default connect(mapStateToProps)(DeckList);
