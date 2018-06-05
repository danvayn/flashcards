import React from 'react'
import { TextInput, View } from 'react-native'
import ErrorText from './ErrorText'
import { Text, Item, Label, Form, Input, Button } from 'native-base'
import { withFormik } from 'formik'

const enhancer = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ title: ''}),
  validate: (values, props) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title Required';
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
    props.handleSubmit({title: values.title})
  }
})
const MyReactNativeForm = props => (
  <Form>
      {props.touched.title && props.errors.title && <ErrorText>{props.errors.title}</ErrorText>}
    <Item fixedLabel error={props.errors.title ? (true):(false)}>
      <Label>Title</Label>
      <Input
        onChangeText={text => props.setFieldValue('title', text)}
        value={props.values.title}
      />
    </Item>
    <Button full  style={{marginTop: 15}} onPress={props.handleSubmit}>
      <Text>Submit</Text>
    </Button>
  </Form>
);

export default enhancer(MyReactNativeForm)
