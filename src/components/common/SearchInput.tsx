'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

import { paths } from '@/routes';

/* components */
import Input from './Input';

/* actions */
import * as actions from '@/actions';

type SearchInputProps = {
  name: string;
  label: string;
  searchParamsKey: string;
};

function SearchInput({ name, label, searchParamsKey }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /* func will be triggered after 1000 ms (debounce in 'Input.tsx') automatically */
  useEffect(() => {
    if (inputValue === undefined) return; // required to save term after reloading page OR directly visiting page

    if (pathname.includes(paths.userFriends())) {
      actions.searchForFriend(inputValue);
      return;
    }

    if (pathname.includes(paths.music())) {
      actions.searchForMusic(inputValue);
      return;
    }

    if (pathname.includes(paths.userPosts())) {
      const friendSearchParam = searchParams.get('friend');
      const postSearchParam = searchParams.get('post');

      /* search for 'FRIEND' or 'POST' => if there are neither 'FRIEND' searchParam nor 'POST' searchParam */
      if (!friendSearchParam && !postSearchParam) {
        if (searchParamsKey === 'friend') {
          actions.filterFriendsPosts(inputValue);
        }
        if (searchParamsKey === 'post') {
          actions.filterFriendsPosts(undefined, inputValue);
        }
        return;
      }

      /* search for 'FRIEND' and 'POST' => if there are both 'FRIEND' searchParam and 'POST' searchParam */
      if (friendSearchParam && postSearchParam) {
        if (searchParamsKey === 'friend') {
          actions.filterFriendsPosts(inputValue, postSearchParam);
          return;
        }
        if (searchParamsKey === 'post') {
          actions.filterFriendsPosts(searchParams.get('friend'), inputValue);
          return;
        }
      }

      /* if 'FRIEND' url term is included => check if we should find another 'FRIEND' OR find specific friend's post */
      if (friendSearchParam && !postSearchParam) {
        if (searchParamsKey === 'friend') {
          actions.filterFriendsPosts(inputValue);
        } else {
          actions.filterFriendsPosts(friendSearchParam, inputValue);
        }
        return;
      }

      /* if 'POST' url term is included => check if we should find another 'POST' OR find specific friend's post */
      if (postSearchParam && !friendSearchParam) {
        if (searchParamsKey === 'post') {
          actions.filterFriendsPosts(undefined, inputValue);
        } else {
          actions.filterFriendsPosts(inputValue, postSearchParam);
        }
        return;
      }

      actions.filterFriendsPosts();
    }
  }, [inputValue]);

  return (
    <Input
      passValueToParent={setInputValue}
      defaultValue={searchParams.get(searchParamsKey) || ''}
      classWrapper="mb-3 text-white"
      name={name}
      label={label}
      type="text"
    />
  );
}

export default SearchInput;
