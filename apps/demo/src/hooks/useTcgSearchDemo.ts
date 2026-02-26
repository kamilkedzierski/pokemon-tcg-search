import {
  getCardsById,
  getSearchDatasetJson,
  type CardDetails,
} from '@pokemon-search/tcg-dataset';
import {
  buildIndex,
  searchByName,
  searchByNumber,
  type SearchHit,
} from '@pokemon-search/tcg-native';
import { useEffect, useState } from 'react';

import { parseSearchHits } from '../helpers/parseSearchHits';
import type { ResultCard } from '../types/global';

const INITIAL_NAME_QUERY = 'pikachu';
const INITIAL_NUMBER_QUERY = '4';
const SEARCH_LIMIT = 20;
const cardsByIdMap = getCardsById();

type SearchExecutor = (
  indexId: number,
  query: string,
  limit: number
) => string;

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function useTcgSearchDemo() {
  const [indexId, setIndexId] = useState<number | null>(null);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasIndex = indexId !== null;
  const isBuildingIndex = loading && !hasIndex;

  const results: ResultCard[] = hits.map((hit) => {
    const preview = cardsByIdMap.get(hit.id);
    return {
      id: hit.id,
      name: preview?.name ?? hit.id,
      imageUrl: preview?.imageSmall ?? preview?.imageLarge ?? null,
    };
  });

  const getCardById = (cardId: string): CardDetails | null => cardsByIdMap.get(cardId) ?? null;

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const newIndexId = buildIndex(getSearchDatasetJson());
      setIndexId(newIndexId);
      setHits([]);
    } catch (errorValue) {
      setError(getErrorMessage(errorValue, 'Unknown buildIndex error'));
    } finally {
      setLoading(false);
    }
  }, []);

  const runSearch = (
    rawQuery: string,
    searchFn: SearchExecutor,
    fallbackErrorMessage: string
  ) => {
    if (indexId === null) {
      setError('Build index first');
      return;
    }

    if (loading) {
      return;
    }

    const normalizedQuery = rawQuery.trim();
    if (!normalizedQuery) {
      setError(null);
      setHits([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resultJson = searchFn(indexId, normalizedQuery, SEARCH_LIMIT);
      setHits(parseSearchHits(resultJson));
    } catch (errorValue) {
      setError(getErrorMessage(errorValue, fallbackErrorMessage));
    } finally {
      setLoading(false);
    }
  };

  const onSearchByName = (query: string) =>
    runSearch(query, searchByName, 'Unknown searchByName error');
  const onSearchByNumber = (numberQuery: string) =>
    runSearch(numberQuery, searchByNumber, 'Unknown searchByNumber error');

  return {
    error,
    hasIndex,
    initialNameQuery: INITIAL_NAME_QUERY,
    initialNumberQuery: INITIAL_NUMBER_QUERY,
    isBuildingIndex,
    getCardById,
    results,
    loading,
    onSearchByName,
    onSearchByNumber,
  };
}
