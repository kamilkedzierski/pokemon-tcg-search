export function joinValues(values: readonly string[]) {
  if (values.length === 0) {
    return '-';
  }

  return values.join(', ');
}
