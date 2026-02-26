import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResultsList } from '../components/ResultsList';
import { SearchControls } from '../components/SearchControls';
import { appStyles } from '../styles/appStyles';
import type { ResultCard } from '../types/global';

interface SearchScreenProps {
  error: string | null;
  hasIndex: boolean;
  initialNameQuery: string;
  initialNumberQuery: string;
  isBuildingIndex: boolean;
  loading: boolean;
  onSearchByName: (query: string) => void;
  onSearchByNumber: (number: string) => void;
  onOpenCard: (cardId: string) => void;
  results: ResultCard[];
};

export const SearchScreen = ({
  error,
  hasIndex,
  initialNameQuery,
  initialNumberQuery,
  isBuildingIndex,
  loading,
  onSearchByName,
  onSearchByNumber,
  onOpenCard,
  results,
}: SearchScreenProps) => {
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={appStyles.container}>
        <SearchControls
          hasIndex={hasIndex}
          initialNameQuery={initialNameQuery}
          initialNumberQuery={initialNumberQuery}
          isBusy={loading || isBuildingIndex}
          onSearchByName={onSearchByName}
          onSearchByNumber={onSearchByNumber}
        />

        {loading ? <ActivityIndicator size="large" color="#1f6feb" /> : null}
        {error ? <Text style={appStyles.errorText}>{error}</Text> : null}

        <ResultsList results={results} loading={loading} onPressResult={onOpenCard} />
      </View>
    </SafeAreaView>
  );
}
