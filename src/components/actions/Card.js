import React from 'react'
import {View } from 'react-native'
import {Button, Icon, Text} from 'native-base'

const CardActions = (props) => {
  const actionStyle = props.style || {}
  return(
    <View style={[cardActions, actionStyle]}>
      <Button iconLeft onPress={() => props.onPrevious()}>
        <Icon name="arrow-back" />
        <Text>Previous</Text>
      </Button>
      <Button onPress={() => props.onFlip()}>
        <Text>Flip</Text>
      </Button>
      <Button iconRight onPress={() => props.onNext()}>
        <Text>Next</Text>
        <Icon name="arrow-forward" />
      </Button>
    </View>
  )
}
const cardActions = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 10,
}

export default CardActions
