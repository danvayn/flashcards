import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { white, red } from '../../utils/colors';

export default ErrorText = (props) => (
  <Text style={styles.errorList}>
    {props.children}
  </Text>
)
