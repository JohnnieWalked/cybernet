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
      actions.searchForFriend.bind(null, inputValue)();
    }
    if (pathname.includes(paths.music())) {
      actions.searchForMusic.bind(null, inputValue)();
    }
    if (pathname.includes(paths.userPosts())) {
      actions.filterFriendsPosts.bind(null, inputValue)();
    }
  }, [inputValue, pathname]);

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
