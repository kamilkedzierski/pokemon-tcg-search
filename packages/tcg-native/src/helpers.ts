export function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeNumber(value: string): string {
  const slashIndex = value.indexOf('/');
  const beforeSlash = slashIndex === -1 ? value : value.slice(0, slashIndex);
  return normalize(beforeSlash);
}

export function parseLimit(limit: number): number {
  return Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 0;
}
