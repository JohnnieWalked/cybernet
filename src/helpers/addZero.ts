export function addZero(item: number) {
  if (item < 10) {
    return `0${item}`;
  } else {
    return item;
  }
}
