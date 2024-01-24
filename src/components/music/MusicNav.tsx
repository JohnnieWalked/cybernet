'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/redux-typed-hooks';

/* helpers */
import { addZero } from '@/helpers/addZero';

export default function MusicNav() {
  const { song } = useAppSelector((state) => state.songSlice);

  return (
    <div className="flex gap-5">
      <div className=" text-gray-300">Now playing:</div>
      <div>
        <span>{song?.author}</span> -{' '}
        <span className=" text-yellow-400">{song?.name}</span>
      </div>
    </div>
  );
}
