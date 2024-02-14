'use server';

import { redirect } from 'next/navigation';
import { findKeyInEntries } from '@/helpers/findKeyInEntries';
import { getLengthOfIterable } from '@/helpers/getLengthOfIterable';
import { paths } from '@/routes';

/**
 * urlQueriesPostsPage is a server actions, that receives:
 *  - searchParamsEntries from hook useSearchParams();
 *  - searchParamsKey, which is defined as props in component SearchInput.tsx while rendering;
 *  - inputValue, which is a debounced data from component Input.tsx, which is a part of SearchInput.tsx.
 * To clearify more, visit file SearchInput.tsx and Input.tsx
 */
export async function urlQueriesPostsPage(
  searchParamsEntries: IterableIterator<[string, string]>, //ReadonlyURLSearchParams doesn`t work on server side (searchParam.get() -> issue: "is not a function")
  searchParamsKey: string,
  inputValue: string
) {
  let params: { [x: string]: string } = {};

  /* if there are no url queries in url from the beggining -> pass searchParamKey and inputValue */
  if (!getLengthOfIterable(searchParamsEntries)) {
    redirect(paths.userPosts({ [searchParamsKey]: inputValue }));
  }

  /* if url query consists of some keys and 1 key === searchParamsKey -> update exisitng key (that equals searchParamsKey) with value and don't touch another keys and values */
  if (findKeyInEntries(searchParamsEntries, searchParamsKey)) {
    for (let [key, value] of searchParamsEntries) {
      if (key !== searchParamsKey) {
        params[key] = value;
      } else {
        if (!inputValue) break; // break to avoid passing empty value to url (without it will be for example /?post=somePost&friend=)
        params[searchParamsKey] = inputValue;
      }
    }
  } else {
    /* else, if there are no key which equals searchParamsKey -> create new key in url and keep other keys with values */
    params[searchParamsKey] = inputValue;
    for (let [key, value] of searchParamsEntries) {
      params[key] = value;
    }
  }

  redirect(paths.userPosts(params));
}
