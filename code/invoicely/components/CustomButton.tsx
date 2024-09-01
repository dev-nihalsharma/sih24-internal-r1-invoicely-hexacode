import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '@/constants/Colors';

const CustomButton = ({ onPress, buttonText }: CustomButtonParams) => {
  return (
    <View style={styles.buttonView}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalColors.primary,
    height: 45,
    margin: 20,

    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
  },
});
