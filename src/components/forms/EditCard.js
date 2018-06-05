import React from 'react';
import { TextInput, View } from 'react-native';

import { Text, Item, Label, Form, Input, Button } from 'native-base'
import { withFormik } from 'formik';

const enhancer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ front: props.card.front, back: props.card.back}),
  validate: (values, props) => {
    const errors = {};
    if (values.front.length < 1) {
      errors.front = 'Required';
    }
    if (values.back.length < 1) {
      errors.back = 'Required';
    }
    return errors;
  },
  handleSubmit: (
    values,
    {
      props,
      setErrors,
    }
  ) => {
    props.handleSubmit({front: values.front, back: values.back, id: props.card.id})
  }
})
const MyReactNativeForm = props => {
  const {touched, errors} = props
  const erroredFront = touched.front && errors.front
  const erroredBack = touched.back && errors.back
  return (
  <Form>
    <Item fixedLabel error={props.errors.front ? (true):(false)}>
      <Label>Question</Label>
      <Input
        onChangeText={text => props.setFieldValue('front', text)}
        value={props.values.front}
      />
    </Item>
    <Item fixedLabel error={props.errors.back ? (true):(false)}>
      <Label>Answer</Label>
      <Input
        onChangeText={text => props.setFieldValue('back', text)}
        value={props.values.back}
      />
    </Item>
    <Button full style={{marginTop: 15}} onPress={props.handleSubmit}>
      <Text>Submit</Text>
    </Button>
  </Form>
)}

export default enhancer(MyReactNativeForm)
