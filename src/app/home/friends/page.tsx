import { Suspense } from 'react';

/* components */
import Title from '@/components/common/Title';
import SearchInput from '@/components/common/SearchInput';
import UserFriendsList from '@/components/friend/UserFriendsList';

/* icons */
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from 'react-icons/rx';

interface FriendsPageParams {
  searchParams: {
    term: string;
  };
}

export default async function FriendsPage({ searchParams }: FriendsPageParams) {
  return (
    <div className="flex flex-col justify-center items-center gap-20 transition-all">
      <Title>My Friends</Title>
      <div className="flex flex-col justify-center items-center gap-4">
        <Suspense fallback={'Loading...'}>
          <SearchInput />
        </Suspense>

        <div className=" text-center text-gray-300 text-md font-light">
          To search new users: &apos;@&apos; + user&apos;s username.
          <br />
          For example: <span className=" text-yellow-400">@samurai</span>
        </div>

        <div className="grid grid-cols-[300px_300px] text-cyan-400 grid-flow-row transition-all">
          <RxCornerTopLeft className=" h-10 w-auto" />
          <RxCornerTopRight className=" h-10 w-auto justify-self-end" />

          <div className="grid overflow-auto px-10 col-start-1 col-end-3 transition-all gap-y-7 scroll-smooth max-h-80 ">
            <Suspense fallback={'Loading...'}>
              <UserFriendsList searchParams={searchParams} />
            </Suspense>
          </div>

          <RxCornerBottomLeft className=" h-10 w-auto" />
          <RxCornerBottomRight className=" h-10 w-auto justify-self-end " />
        </div>
      </div>
    </div>
  );
}
