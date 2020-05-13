import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { paletteName } = route.params;
  const { colors } = route.params;
  return (
    <FlatList
      data={colors}
      keyExtractor={(item) => item.hexCode}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
});

export default ColorPalette;
