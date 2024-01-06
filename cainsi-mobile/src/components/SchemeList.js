import React from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';

export default function SchemeList() {
  const imageNames = ['1.jpg', '2.jpg'];

  const renderItem = ({ item }) => (
    <View>
      <Image style={style.image} source={{ uri: item.uri }} />
      <Text>asd as </Text>
    </View>
  );

  const imageList = imageNames.map((imageName) => ({
    id: imageName,
    uri: `asset:/assets/scheme/${imageName}`,
  }));

  return (
    <FlatList 
        data={imageList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Text>{item.uri}</Text>}
        contentContainerStyle = {style.flatListContententContainer}
    />
  );
}

const style = StyleSheet.create({
	flatListContententContainer: {
        paddingHorizontal: 5,
    },
    image: {
		width: 100, 
        height: 100, 
        margin: 5 
	},
});