import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native';
import { Container, Content, Left, Right, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import DeckListItem from '../components/DeckListItem'
import {purple, gray} from '../utils/colors'
import TextButton from '../components/TextButton'
import { populateDecks, removeAllDecks } from '../actions'

@connectActionSheet
class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Deck List",
      headerRight: (
        <Button transparent onPress={params.onOpenActionSheet}>
          <Icon name='more'/>
        </Button>
      )
    }
  }

  onPressDeck = (title, index) => {
    this.props.navigation.navigate(
      'DeckDetails',
      { deckTitle: title, deckIndex: index }
    )
  }

  componentDidMount(){
    this.props.navigation.setParams({ onOpenActionSheet: this._onOpenActionSheet })
  }

  onDelete = () => {
    // return
  }

  renderDeck = ({item, index}) => {
    return(
      //deckitem component here
      <View style={{width: "100%"}}>
        <DeckListItem
          deck={item}
          onPress={() => this.onPressDeck(item.title, index)}
        />
      </View>
    )
  }
  renderSeparator = () => {return (
    <View style={styles.separator}/>
  )}

  render() {
    const { decks } = this.props
    const renderHeader = (
      <Button full
          style={{backgroundColor:purple}}
          onPress={() => this.props.navigation.navigate('AddDeck',{})}>
          <Text>Add a new Deck</Text>
      </Button>)

    return(
      <Container>
          {decks.length > 0 ? (
            <Content>
              <FlatList
                data={decks}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={renderHeader}
                renderItem={this.renderDeck}
                keyExtractor={item => item.id}
              />
            </Content>) : (
            <View style={styles.container}>
              {renderHeader}
              <View style={styles.tipContainer}>
                <Text style={styles.tipText}>Get Started by adding a deck!</Text>
              </View>
            </View>
            )
          }
      </Container>
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
    })
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: purple,
  },
  addButton: {
    width: "100%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  container: {
    minWidth: "100%",
    minHeight: "100%",
  },
  tipContainer: {
    flex: 1,
    maxWidth: "100%",
    maxHeight: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    textAlign: 'center'
  },
})


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
