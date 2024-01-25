import { addZero } from './addZero';

export function toHumanDuration(timeDuration: number) {
  const durationMinutes = addZero(Math.floor(timeDuration / 60));
  const durationSeconds = addZero(
    Math.floor(timeDuration - +durationMinutes * 60)
  );

  return `${durationMinutes}:${durationSeconds}`;
}
