import { Image, Pressable, Text, View } from 'react-native';

import { appStyles } from '../styles/appStyles';
import type { ResultCard } from '../types/global';

type ResultRowProps = {
  item: ResultCard;
  onPress?: (cardId: string) => void;
};

export const ResultRow = ({ item, onPress }: ResultRowProps) => {

  const handlePress = () => {
    onPress?.(item.id);
  };

  return (
    <Pressable
      style={appStyles.row}
      onPress={handlePress}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={appStyles.rowImage}
          resizeMode="cover"
        />
      ) : null}
      <View style={appStyles.rowContent}>
        <Text style={appStyles.rowName}>{item.name}</Text>
        <Text style={appStyles.rowId}>{item.id}</Text>
      </View>
    </Pressable>
  );
}   
