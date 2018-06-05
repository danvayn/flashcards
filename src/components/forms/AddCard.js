import React from 'react';
import { TextInput, View } from 'react-native';
import ErrorText from './ErrorText'
import { Text, Item, Label, Form, Input, Button } from 'native-base'
import { withFormik } from 'formik';

const enhancer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ front: '', back: ''}),
  validate: (values, props) => {
    const errors = {};
    if (!values.front) {
      errors.front = 'Card Front Required';
    }
    if (!values.back) {
      errors.back = 'Card Back Required';
    }
    return errors;
  },
  handleSubmit: (
    values,
    {
      setErrors,
      props,
    }
  ) => {

    props.handleSubmit({front: values.front, back: values.back})
  }
})
const MyReactNativeForm = props => {
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
  </Form>)
}

export default enhancer(MyReactNativeForm)
