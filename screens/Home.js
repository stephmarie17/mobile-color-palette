import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, Text, SegmentedControlIOS } from 'react-native';
import PalettePreview from '../components/PalettePreview';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFetchPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const fetchedPalettes = await result.json();
    if (result.ok) {
      setPalettes(fetchedPalettes);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setIsRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setPalettes((colorPalettes) => [newColorPalette, ...colorPalettes]);
    }
  }, [newColorPalette]);

  return (
    <FlatList
      style={style.list}
      data={palettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add Color Palette');
          }}
        >
          <Text style={style.modalText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const style = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  },
});

export default Home;
