import React from 'react'
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon, List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux'
import { populateDecks, removeAllDecks } from '../actions'

class Settings extends React.Component{
  render() {
    const { deleteDecks, generateDecks } = this.props
    return(
      //field here
      <Container>
        <Header>
            <Body><Title>Settings</Title></Body>
        </Header>
        <Content>
            <Button transparent onPress={() => generateDecks()}
            ><Text>Generate Decks</Text></Button>
          <Button transparent onPress={() => deleteDecks()}
              ><Text>Delete All Decks</Text></Button>
        </Content>
      </Container>
    )
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
export default connect(null,mapDispatchToProps)(Settings)
