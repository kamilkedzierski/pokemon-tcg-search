import { FlatList, Text, type ListRenderItem } from 'react-native';

import { appStyles } from '../styles/appStyles';
import type { ResultCard } from '../types/global';
import { ResultRow } from './ResultRow';

type ResultsListProps = {
  results: ResultCard[];
  loading: boolean;
  onPressResult?: (cardId: string) => void;
};

const EMPTY_RESULTS_COMPONENT = <Text style={appStyles.emptyText}>No results yet.</Text>;

export const ResultsList = ({ results, loading, onPressResult }: ResultsListProps) => {
  const renderItem: ListRenderItem<ResultCard> = ({ item }) => {
    return <ResultRow item={item} onPress={onPressResult} />;
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={appStyles.list}
      initialNumToRender={12}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={50}
      windowSize={7}
      removeClippedSubviews
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={loading ? null : EMPTY_RESULTS_COMPONENT}
    />
  );
}
