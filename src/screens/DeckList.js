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

  state = {
    selected: ''
  }

  componentDidMount(){

  }

  selectDeck = (item) => {
    this.props.navigation.navigate(
              'DeckDetails',
              { id: item.id, title: item.title }
            )
  }

  onDelete = () => {
    return
  }

  renderDeck = ({item}) => {
    return(
      <ListItem icon marginBottom={10}
        selected={this.state.selected === item.title}
        onPress={() => this.selectDeck(item)}
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
      //field here
      <Container>
        <Header>
            <Left/>
            <Body><Title>Deck List</Title></Body>
            <Right>
              <Button transparent>
              <Icon name='menu'/>
            </Button>
            </Right>
        </Header>
          <Content padder>
            <ListItem selected
              onPress={() => this.props.navigation.navigate('AddDeck',{})}>
            <Text>Add a new Deck</Text>
          </ListItem>
            <FlatList
              data={Object.values(decks)}
              renderItem={this.renderDeck}
              keyExtractor={item => item.title}
            />

            <Text>{JSON.stringify(decks)}</Text>
            <Text>{JSON.stringify(this.state)}</Text>
          </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {

  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(DeckList);
