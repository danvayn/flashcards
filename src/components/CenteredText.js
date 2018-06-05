import React from 'react'
import { Text } from 'react-native'

const CenteredText = (props) => {
  const customStyle = props.style || {}
  return (<Text style={[{textAlign: 'center'},customStyle]}>{props.children}</Text>)
}

export default CenteredText
