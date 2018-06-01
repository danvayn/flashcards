import React from 'react';
import { TextInput, View } from 'react-native';

import { Text, Item, Label, Form, Input, Button } from 'native-base'
import { withFormik } from 'formik';

const enhancer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ front: props.card.front, back: props.card.back}),
  validate: (values, props) => {
    const errors = {};
    if (!values.front) {
      errors.front = 'Required';
    }
    if (!values.back) {
      errors.back = 'Required';
    }
    return errors;
  },
  handleSubmit: (
    values,
    {
      props,
    }
  ) => {

    props.handleSubmit({front: values.front, back: values.back, id: props.card.id})
  }
})
const MyReactNativeForm = props => (
  <Form>
    <Item fixedLabel>
      <Label>Question</Label>
      <Input
        onChangeText={text => props.setFieldValue('front', text)}
        value={props.values.front}
      />
    </Item>
    <Item fixedLabel last>
      <Label>Answer</Label>
      <Input
        onChangeText={text => props.setFieldValue('back', text)}
        value={props.values.back}
      />
    </Item>
    <Button onPress={props.handleSubmit}>
      <Text>Submit</Text>
    </Button>
  </Form>
);

export default enhancer(MyReactNativeForm)
