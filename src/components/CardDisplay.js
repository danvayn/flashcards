import React from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import FlashCard from '../components/FlashCard'

class CardDisplay extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   cards = []
    // }
  }
  componentDidMount(){

  }
  componentDidUpdate(){

  }

  render() {
    const card = this.props.currentCard
    const flipped = this.props.flipCurrent
    // const { card } = this.props

    return (
      <View style={styles.cardContainer}>
        <FlashCard
          onPress={this.props.onPress}
          front={card.front}
          back={card.back}
          flipped={flipped}
        />
        {this.props.children}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deckActions: {
    flex: 1,
    position: 'absolute',
    bottom:50,
    left: 0,
    right: 0,

  },
  deckStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  headerTitle: {
    //TODO: figure out what constants can help here
    maxWidth: 300,
    paddingTop: 12
  },
  cardContainer: {
      padding: 15,
      flex: 1,
      justifyContent: "center"
  }
})

export default CardDisplay
