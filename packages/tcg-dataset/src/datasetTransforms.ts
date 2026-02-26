import type { RawCard, RequiredRawCard } from './types';

const EMPTY_STRING_LIST: readonly string[] = Object.freeze([]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

export function hasRequiredFields(card: RawCard): card is RequiredRawCard {
  return isNonEmptyString(card.id)
    && isNonEmptyString(card.name)
    && isNonEmptyString(card.number);
}

export function cloneReadonlyList(values: readonly string[] | undefined): readonly string[] {
  return values?.length ? Object.freeze([...values]) : EMPTY_STRING_LIST;
}
