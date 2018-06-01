import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import TextButton from '../components/TextButton'
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {green} from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { populateDecks, removeAllDecks } from '../actions'

@connectActionSheet
class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      header: (
        <Header>
            <Left/>
            <Body><Title>Deck List</Title></Body>
            <Right>
              <Button transparent onPress={params.onOpenActionSheet}>
              <Icon name='more'/>
            </Button>
            </Right>
        </Header>
    )
    }
  }

  componentWillMount() {
     this.props.navigation.setParams({ onOpenActionSheet: this._onOpenActionSheet });
  }

  state = {
    selected: ''
  }

  selectDeck = (title, index) => {

    this.props.navigation.navigate(
              'DeckDetails',
              { deckTitle: title, deckIndex: index }
            )
  }

  onDelete = () => {
    // return
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

  _onOpenActionSheet = () => {
    let options = ['Generate Decks', 'Delete All Decks', 'Cancel'];
    let generateDecksIndex = 0;
    let deleteAllDecksIndex = 1;
    let cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions({
      options,
      generateDecksIndex,
      deleteAllDecksIndex,
      cancelButtonIndex
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case deleteAllDecksIndex:
          this.props.deleteDecks()
          break
        case generateDecksIndex:
          this.props.generateDecks(10)
          break
      }
    });
  }

  render() {
    const { decks } = this.props

    return(
      //field here
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

function mapDispatchToProps(dispatch, {navigation}){

    // PopulateDecks, also have cards
    //deleteDecks
  return {
    deleteDecks: () => dispatch(removeAllDecks()),
    generateDecks: (amount) => dispatch(populateDecks(amount)),
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(DeckList);
