import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  StyleProp,
} from 'react-native';

interface Props {
  title?: string;
  style?: StyleProp<ViewStyle>;
  onClick?: () => void;
}

const ButtonComponent = ({title = 'Modal', style, onClick}: Props) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, style]}>
        <Text style={styles.buttonText}>X</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: 'red'
  },
});

export default ButtonComponent;