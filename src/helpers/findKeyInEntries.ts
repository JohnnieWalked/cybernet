/**
 * Helper-function which search for key in array of Object.entries();
 * If key was found -> returns true
 * @type {array: IterableIterator<[string, string]>, keyToFind: string }
 *  */
export function findKeyInEntries(
  array: IterableIterator<[string, string]>,
  keyToFind: string
) {
  for (const [key, value] of array) {
    if (key === keyToFind) return true;
  }
}
