import React from 'react'
import {View, StyleSheet } from 'react-native'
import {Button, Icon, Text} from 'native-base'

const CardActions = (props) => {
  const actionStyle = props.style || {}
  return(
    <View style={[styles.cardActions, actionStyle]}>
      <Button style={styles.actionButton} iconLeft onPress={() => props.onPrevious()}>
        <Icon name="arrow-back" />
        <Text>Previous</Text>
      </Button>
      <Button block style={styles.actionButton} onPress={() => props.onFlip()}>
        <Text>Flip Card</Text>
      </Button>
      <Button style={styles.actionButton}  iconRight onPress={() => props.onNext()}>
        <Text>Next</Text>
        <Icon name="arrow-forward" />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  }

})

export default CardActions
