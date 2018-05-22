import React from 'react';
import { TextInput, View } from 'react-native';

import { Text, Item, Label, Form, Input, Button } from 'native-base'
import { withFormik } from 'formik';

const enhancer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ front: '', back: ''}),
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

    props.handleSubmit({front: values.front, back: values.back})
  }
})
const MyReactNativeForm = props => (
  <Form>
    <Item fixedLabel>
      <Label>Front</Label>
      <Input
        onChangeText={text => props.setFieldValue('front', text)}
        value={props.values.email}
      />
    </Item>
    <Item fixedLabel last>
      <Label>Back</Label>
      <Input
        onChangeText={text => props.setFieldValue('back', text)}
        value={props.values.email}
      />
    </Item>
    <Button onPress={props.handleSubmit}>
      <Text>Submit</Text>
    </Button>
    <Text>{JSON.stringify(props)}</Text>
  </Form>
);

export default enhancer(MyReactNativeForm)
