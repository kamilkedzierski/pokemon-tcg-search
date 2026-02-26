import { getCardsById } from '@pokemon-search/tcg-dataset';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../types/navigation';
import { CardDetailsScreen } from './CardDetailsScreen';

const cardsById = getCardsById();

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetails'>;

export function CardDetailsContainerScreen({ route }: Props) {
  return <CardDetailsScreen card={cardsById.get(route.params.cardId) ?? null} />;
}
