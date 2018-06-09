import { View, StyleSheet, Text } from 'react-native'
import { white, red } from '../../utils/colors'
import React from 'react'

export default ErrorText = (props) => (
  <Text style={styles.errorList}>
    {props.children}
  </Text>
)

styles = StyleSheet.create({
  errorList: {
    backgroundColor: red,
    fontSize: 20,
    color: white,
    textAlign: 'center',
  },
})
