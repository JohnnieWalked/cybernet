export function getLengthOfIterable<T>(iterable: Iterable<T>) {
  let count = 0;
  for (const _ of iterable) {
    count++;
  }
  return count;
}
