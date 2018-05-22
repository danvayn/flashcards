import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styled from "styled-components";
import { Container, Header, Body, Title, Subtitle, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import {addOrRemove} from '../utils/helpers'


class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title, id } = navigation.state.params


    return {
      header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{navigation.state.params.title}</Title>
        </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('AddCard',{title, id})}>}>
              <Icon name="add" />
            </Button>
          </Right>
      </Header>
    )
    }
  }

  state = {
    flippedCards: []
  }

  // componentDidMount -- get cards

  componentDidMount(){
  }

  componentDidUpdate(){

  }

  selectCard = (item, index) => {
    let flipped = this.state.flippedCards
    addOrRemove(flipped, item.id)
    this.setState({flippedCards: flipped})
  }

  renderCard = ({item, index}) => {
    return(
      <ListItem marginBottom={10}
        onPress={() => this.selectCard(item, index)}
      >
        <Body>
          <Text>{this.state.flippedCards.includes(item.id) ? item.back : item.front}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {

    const { cards, createdAt, navigation, title } = this.props

    return(
      <Container>
        <Content>
          {cards &&
          <FlatList
            data={this.props.cards}
            extraData={this.state}
            renderItem={this.renderCard}
            keyExtractor={item => item.index}
          />
          }
          <Text>{JSON.stringify(this.state)}</Text>
          <Text>{JSON.stringify(this.props.cards)}</Text>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state, {navigation}){
  const { id } = navigation.state.params
  let deck = state.decks[id]
  return {
    deckID: id,
    navigation: navigation,
    title: deck.title,
    cards: deck.cards,
  }
}

export default connect(mapStateToProps)(DeckDetails);
