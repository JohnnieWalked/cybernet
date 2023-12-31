'use client';

import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

type ScreenPopoverProps = {
  currrentState: boolean;
  children: React.ReactNode;
};

export default function ScreenPopover({
  currrentState,
  children,
}: ScreenPopoverProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currrentState) {
      setOpen(true);
    }

    const popoverTimeout = setTimeout(() => {
      setOpen(false);
    }, 10000);

    () => {
      clearTimeout(popoverTimeout);
    };
  }, [currrentState]);

  return (
    <div
      className={`bg-zinc-900 w-80 border rounded border-green-600 p-5 fixed bottom-[-10%] right-[3%] transition-all ${
        open && 'popUpFromBottom'
      }`}
    >
      <div className="flex flex-col w-full h-full justify-between text-white">
        <div className="flex w-full justify-between">
          <div className=" font-light  tracking-wider text-md">{children}</div>
          <div
            className=" transition-all cursor-pointer hover:text-cyan-300"
            onClick={handleClick}
          >
            <IoMdClose style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
        <div
          className={`rounded h-1 bg-green-600 mt-2 ${
            open && 'line-animation'
          }`}
        ></div>
      </div>
    </div>
  );
}
