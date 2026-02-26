import NativeTcgSearchModule from '../specs/NativeTcgSearchModule';
import { normalize, normalizeNumber, parseLimit } from './helpers';

export type { SearchHit } from './types';

const EMPTY_RESULTS_JSON = '[]';
type SearchExecutor = (
  indexId: number,
  value: string,
  limit: number
) => string;

export function buildIndex(datasetJson: string): number {
  return NativeTcgSearchModule.buildIndex(datasetJson);
}

function runSearch(
  indexId: number,
  value: string,
  limit: number,
  normalizeValue: (input: string) => string,
  searchFn: SearchExecutor
): string {
  const parsedLimit = parseLimit(limit);
  if (parsedLimit === 0) {
    return EMPTY_RESULTS_JSON;
  }

  const normalizedValue = normalizeValue(value);
  return normalizedValue
    ? searchFn(indexId, normalizedValue, parsedLimit)
    : EMPTY_RESULTS_JSON;
}

export function searchByName(
  indexId: number,
  query: string,
  limit: number
): string {
  return runSearch(
    indexId,
    query,
    limit,
    normalize,
    NativeTcgSearchModule.searchByName
  );
}

export function searchByNumber(
  indexId: number,
  number: string,
  limit: number
): string {
  return runSearch(
    indexId,
    number,
    limit,
    normalizeNumber,
    NativeTcgSearchModule.searchByNumber
  );
}
