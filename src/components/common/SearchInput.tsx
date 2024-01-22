'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Input from './Input';

import * as actions from '@/actions';

function SearchInput() {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const searchParams = useSearchParams();

  /* searchForFriend will be triggered after 1000 ms (debounce in 'Input.tsx') automatically */
  useEffect(() => {
    if (inputValue === undefined) return; // required to save term after reloading page OR directly visiting page
    const handleSubmitSearch = actions.searchForFriend.bind(
      null,
      inputValue.trim().toLowerCase()
    );
    handleSubmitSearch();
  }, [inputValue]);

  return (
    <Input
      passValueToParent={setInputValue}
      defaultValue={searchParams.get('term') || ''}
      classWrapper="mb-3 text-white"
      name="search"
      label="Search..."
      type="text"
    />
  );
}

export default SearchInput;
