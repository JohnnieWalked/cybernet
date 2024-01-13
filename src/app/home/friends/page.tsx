import React from 'react';

import Title from '@/components/common/Title';
import Search from '@/components/common/Search';

import { RxCornerBottomLeft } from 'react-icons/rx';
import { RxCornerBottomRight } from 'react-icons/rx';
import { RxCornerTopLeft } from 'react-icons/rx';
import { RxCornerTopRight } from 'react-icons/rx';

export default function FriendsPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <Title>My Friends</Title>
      <div className="flex flex-col justify-center items-center gap-4">
        <Search />
        <div className="grid gap-y-3 grid-cols-[300px_300px] text-cyan-400 transition-all">
          <div className="">
            <RxCornerTopLeft className=" h-10 w-auto" />
          </div>
          <div className=" flex justify-end">
            <RxCornerTopRight className=" h-10 w-auto" />
          </div>
          <div className=" p-3 col-start-1 col-end-3">TEXT</div>
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
