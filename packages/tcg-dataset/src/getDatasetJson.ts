import base1 from '../data/base1.json';
import basep from '../data/basep.json';
import { cloneReadonlyList, hasRequiredFields } from './datasetTransforms';
import type { CardDetails, RawCard, SearchCard } from './types';

const DATASET_SOURCES: readonly (readonly RawCard[])[] = [
  base1,
  basep,
];

type PreparedDataset = {
  searchDatasetJson: string;
  cardsById: ReadonlyMap<string, CardDetails>;
};

let cachedDataset: PreparedDataset | undefined;

function toCardDetails(
  card: RawCard,
  id: string,
  name: string,
  number: string
): CardDetails {
  return {
    id,
    name,
    number,
    imageSmall: card.images?.small ?? null,
    imageLarge: card.images?.large ?? null,
    supertype: card.supertype ?? null,
    subtypes: cloneReadonlyList(card.subtypes),
    hp: card.hp ?? null,
    types: cloneReadonlyList(card.types),
    rarity: card.rarity ?? null,
    artist: card.artist ?? null,
    setName: card.set?.name ?? null,
  };
}

function buildDataset(): PreparedDataset {
  const searchCards: SearchCard[] = [];
  const cardsById = new Map<string, CardDetails>();

  for (const sourceCards of DATASET_SOURCES) {
    for (const card of sourceCards) {
      if (!hasRequiredFields(card)) {
        continue;
      }

      const id = card.id.trim();
      const name = card.name.trim();
      const number = card.number.trim();

      searchCards.push({ id, name, number });
      cardsById.set(id, toCardDetails(card, id, name, number));
    }
  }

  return {
    searchDatasetJson: JSON.stringify(searchCards),
    cardsById,
  };
}

function getPreparedDataset(): PreparedDataset {
  if (!cachedDataset) {
    cachedDataset = buildDataset();
  }

  return cachedDataset;
}

export function getSearchDatasetJson(): string {
  return getPreparedDataset().searchDatasetJson;
}

export function getCardsById(): ReadonlyMap<string, CardDetails> {
  return getPreparedDataset().cardsById;
}
