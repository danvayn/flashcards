import React from 'react'
import { View, Text } from 'react-native'
import { Container } from 'native-base';


const Loading = () => {
  return (
    <Container>
      <View style={{alignSelf: 'center'}}>
        <Text>Loading...</Text>
      </View>
    </Container>
  )
}

export default Loading
