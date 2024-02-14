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

    if (pathname.includes(paths.userPosts({}))) {
      actions.urlQueriesPostsPage(
        searchParams.entries(),
        searchParamsKey,
        inputValue
      );
      return;

      /* search for 'FRIEND' or 'POST' => if there are neither 'FRIEND' searchParam nor 'POST' searchParam */

      /* search for 'FRIEND' and 'POST' => if there are both 'FRIEND' searchParam and 'POST' searchParam */

      /* if 'FRIEND' url term is included => check if we should find another 'FRIEND' OR find specific friend's post */

      /* if 'POST' url term is included => check if we should find another 'POST' OR find specific friend's post */
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
