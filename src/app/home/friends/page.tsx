'use client';

import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux-typed-hooks';

/* components */
import Title from '@/components/common/Title';
import Search from '@/components/common/Search';

/* icons */
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from 'react-icons/rx';

export default function FriendsPage() {
  const userData = useAppSelector((state) => state.userSlice.userData);

  return (
    <div className="flex flex-col justify-center items-center gap-20 transition-all">
      <Title>My Friends</Title>
      <div className="flex flex-col justify-center items-center gap-4">
        <Search />
        <div className="grid gap-y-3 grid-cols-[300px_300px] text-cyan-400 grid-flow-row transition-all">
          <div className="">
            <RxCornerTopLeft className=" h-10 w-auto" />
          </div>
          <div className=" flex justify-end">
            <RxCornerTopRight className=" h-10 w-auto" />
          </div>
          <div className=" p-3 col-start-1 col-end-3 h-96 transition-all ">
            {JSON.stringify(userData)}
          </div>
          <div>
            <RxCornerBottomLeft className=" h-10 w-auto" />
          </div>
          <div className="flex justify-end">
            <RxCornerBottomRight className=" h-10 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
