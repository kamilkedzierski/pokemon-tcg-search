import type { SearchHit } from '@pokemon-search/tcg-native';

function isSearchHit(item: unknown): item is SearchHit {
  if (typeof item !== 'object' || item === null) {
    return false;
  }

  const id = Reflect.get(item, 'id');
  const score = Reflect.get(item, 'score');
  return typeof id === 'string' && typeof score === 'number';
}

export function parseSearchHits(json: string): SearchHit[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.filter(isSearchHit) : [];
  } catch {
    return [];
  }
}
