'use client';

import React, { useState } from 'react';

/* RTK */
import { useAppSelector } from '@/hooks/redux-typed-hooks';
import { useAppDispatch } from '@/hooks/redux-typed-hooks';

/* components */
import Title from '@/components/common/Title';
import Loader from '@/components/common/Loader';
import UserFriendList from '@/components/user/UserFriendList';
import Input from '@/components/common/Input';

/* icons */
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from 'react-icons/rx';

export default function FriendsPage() {
  const user = useAppSelector((state) => state.userSlice.userData);

  /* check value typed in <Input /> */
  const [inputValue, setInputValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-20 transition-all">
      <Title>My Friends</Title>

      {user ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            setInputValue={setInputValue}
            classWrapper="mb-3 text-white"
            name="search"
            label="Search..."
            type="text"
          />

          <div className=" text-center text-gray-300 text-md font-light">
            To search new users: &apos;@&apos; + user&apos;s username.
            <br />
            For example: <span className=" text-yellow-400">@samurai</span>
          </div>

          <div className="grid grid-cols-[300px_300px] text-cyan-400 grid-flow-row transition-all">
            <RxCornerTopLeft className=" h-10 w-auto" />
            <RxCornerTopRight className=" h-10 w-auto justify-self-end" />

            <div className=" px-2 col-start-1 col-end-3 h-auto transition-all">
              <UserFriendList user={user} />
            </div>

            <RxCornerBottomLeft className=" h-10 w-auto" />
            <RxCornerBottomRight className=" h-10 w-auto justify-self-end " />
          </div>
        </div>
      ) : (
        <Loader width="50%" color="var(--redLight)" />
      )}
    </div>
  );
}
