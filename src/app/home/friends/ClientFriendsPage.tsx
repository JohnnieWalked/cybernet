'use client';

/**
 * THIS FILE WAS CREATED TO USE SUPPORTED PATTERN FROM NEXT.JS (Passing Server Components to Client Components as Props).
 * Our component "UserFriendsList.tsx" is a server component.
 *
 * Due to rules of next.js, we can't use server components in client components.
 * So, we are going to pass a server component "UserFriendList.tsx" to our page which is a server component too.
 * And we are going to pass this client version of page to server component page.
 *
 * Reason: we cant import directly server component (UserFriendsList.tsx) to client component (ClientFriendsPage (this file))
 *
 * Perhaps, it's not the best way to solve this kind of problem.
 *  */

import React, { useState } from 'react';

/* components */
import Title from '@/components/common/Title';
import Loader from '@/components/common/Loader';
import Input from '@/components/common/Input';

/* icons */
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from 'react-icons/rx';

type ClientFriendsPageProps = {
  children: React.ReactNode;
};

export default function ClientFriendsPage({
  children,
}: ClientFriendsPageProps) {
  /* check value typed in <Input /> */
  const [inputValue, setInputValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-20 transition-all">
      <Title>My Friends</Title>
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
            {children}
          </div>

          <RxCornerBottomLeft className=" h-10 w-auto" />
          <RxCornerBottomRight className=" h-10 w-auto justify-self-end " />
        </div>
      </div>
    </div>
  );
}
