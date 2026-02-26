import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTcgSearchDemo } from '../hooks/useTcgSearchDemo';
import type { RootStackParamList } from '../types/navigation';
import { SearchScreen } from './SearchScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export function SearchContainerScreen({ navigation }: Props) {
  const {
    error,
    hasIndex,
    initialNameQuery,
    initialNumberQuery,
    isBuildingIndex,
    results,
    loading,
    onSearchByName,
    onSearchByNumber,
  } = useTcgSearchDemo();

  return (
    <SearchScreen
      error={error}
      hasIndex={hasIndex}
      initialNameQuery={initialNameQuery}
      initialNumberQuery={initialNumberQuery}
      isBuildingIndex={isBuildingIndex}
      loading={loading}
      onSearchByName={onSearchByName}
      onSearchByNumber={onSearchByNumber}
      onOpenCard={(cardId) => navigation.navigate('CardDetails', { cardId })}
      results={results}
    />
  );
}
