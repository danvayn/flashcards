import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

styles = StyleSheet.create({
  text: {
    color: white,
    textAlign: 'center',
  },
})
