import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '@/constants/Colors';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  backgroundWhite,
  hidden = false,
}: CustomTextInputParams) => {
  return (
    <TextInput
      style={backgroundWhite ? { ...styles.input, backgroundColor: 'white' } : styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      autoCorrect={false}
      autoCapitalize='none'
      secureTextEntry={hidden}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: GlobalColors.borderLight,
    borderWidth: 1,
    borderRadius: 7,
  },
});
