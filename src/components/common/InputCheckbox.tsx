'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from '@nextui-org/react';

/* actions */
import * as actions from '@/actions';

type InputCheckboxProps = {
  name: string;
  label: string;
  searchParamsKey: string;
};

export default function InputCheckbox({
  name,
  label,
  searchParamsKey,
}: InputCheckboxProps) {
  const searchParams = useSearchParams();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // /* debounce */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      actions.showMyPosts(isSelected);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [isSelected]);

  return (
    <Checkbox
      defaultChecked={searchParams.get(searchParamsKey) ? true : false}
      className=" self-center"
      defaultSelected
      radius="sm"
      color="warning"
      aria-label={name}
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      <div className="text-white">{label}</div>
    </Checkbox>
  );
}
