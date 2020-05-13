import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ colorName, hexCode }) => {
  const boxColor = {
    backgroundColor: hexCode,
  };

  const textStyle = {
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.boxText, boxColor, textStyle]}>
        {colorName} {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxText: {
    padding: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  container: {
    paddingHorizontal: 10,
  },
});

export default ColorBox;
