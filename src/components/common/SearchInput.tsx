'use client';

import { useCallback, useEffect, useState } from 'react';
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

  const handleUrlQueries = useCallback(() => {
    if (inputValue === undefined) return; // required to save term after reloading page OR directly visiting page

    if (pathname.includes(paths.userFriends()))
      actions.searchForFriend(inputValue);

    if (pathname.includes(paths.music())) actions.searchForMusic(inputValue);

    if (pathname.includes(paths.userPosts({})))
      actions.urlQueriesPostsPage(
        searchParams.entries(),
        searchParamsKey,
        inputValue
      );
  }, [inputValue]);

  /* func will be triggered after 1000 ms (debounce in 'Input.tsx') automatically */
  useEffect(() => {
    handleUrlQueries();
  }, [handleUrlQueries]);

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
