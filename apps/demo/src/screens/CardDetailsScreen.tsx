import type { CardDetails } from '@pokemon-search/tcg-dataset';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DetailRow } from '../components/DetailRow';
import { joinValues } from '../helpers/joinValues';
import { appStyles } from '../styles/appStyles';

interface CardDetailsScreenProps {
  card: CardDetails | null;
};

export const CardDetailsScreen = ({ card }: CardDetailsScreenProps) => {
  if (!card) {
    return (
      <SafeAreaView style={appStyles.detailsContainer}>
        <View style={appStyles.detailsContent}>
          <Text style={appStyles.detailsTitle}>Card not found</Text>
          <Text style={appStyles.detailsMeta}>This card is not available in the current dataset.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageUri = card.imageLarge ?? card.imageSmall;

  return (
    <SafeAreaView style={appStyles.detailsContainer}>
      <ScrollView contentContainerStyle={appStyles.detailsContent}>
        {imageUri ? <Image source={{ uri: imageUri }} style={appStyles.detailsImage} /> : null}

        <Text style={appStyles.detailsTitle}>{card.name}</Text>
        <Text style={appStyles.detailsMeta}>ID: {card.id}</Text>

        <DetailRow label="Number" value={card.number} />
        <DetailRow label="Set" value={card.setName ?? '-'} />
        <DetailRow label="Supertype" value={card.supertype ?? '-'} />
        <DetailRow label="Subtypes" value={joinValues(card.subtypes)} />
        <DetailRow label="HP" value={card.hp ?? '-'} />
        <DetailRow label="Types" value={joinValues(card.types)} />
        <DetailRow label="Rarity" value={card.rarity ?? '-'} />
        <DetailRow label="Artist" value={card.artist ?? '-'} />
      </ScrollView>
    </SafeAreaView>
  );
}
