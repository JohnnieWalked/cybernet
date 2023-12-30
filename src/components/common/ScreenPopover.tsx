'use client';

import { createPortal } from 'react-dom';
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
  const [open, setOpen] = useState<boolean>(true);

  // const popoverTimeout = setTimeout(() => {
  //   setOpen(false);
  // }, 5000);

  const handleClick = () => {
    setOpen(false);
    // clearTimeout(popoverTimeout);
  };

  // useEffect(() => {
  //   if (currrentState) {
  //     setOpen(true);
  //   }

  //   () => {
  //     clearTimeout(popoverTimeout);
  //   };
  // }, [currrentState, popoverTimeout]);

  return createPortal(
    <>
      {open && (
        <div className="bg-zinc-900 fixed right-[3%] bottom-[3%] w-80 h-10 border rounded border-green-600 p-5 box-content">
          <div className="flex flex-col w-full h-full justify-between items-center text-white">
            <div className="flex w-full justify-between">
              <div className=" font-light  tracking-wider text-md">
                {children}
              </div>
              <div
                className=" transition-all cursor-pointer hover:text-cyan-300"
                onClick={handleClick}
              >
                <IoMdClose style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div className="popover-animate w-full rounded h-1"></div>
          </div>
        </div>
      )}
    </>,
    document.querySelector('.popover-container')!
  );
}
