import React from 'react'
import { Text } from 'react-native'

const CenteredText = (props) => {
  const customStyle = props.customStyle || {}
  return (<Text style={[{textAlign: 'center'},customStyle]}>{props.children}</Text>)
}

export default CenteredText
