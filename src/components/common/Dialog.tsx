'use client';

/* hooks */
import { useRef, useEffect } from 'react';

/* icons */
import { CiCircleRemove } from 'react-icons/ci';

type DialogProps = {
  isOpen: boolean;
  handleDialogClose: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Dialog({
  isOpen,
  children,
  handleDialogClose,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog
      onClose={handleDialogClose}
      className={`${className}`}
      ref={dialogRef}
    >
      <div
        onClick={handleDialogClose}
        className="flex w-max float-end gap-3 items-center text-5xl text-white transition-all cursor-pointer hover:scale-125 hover:text-red-400"
      >
        <CiCircleRemove />
      </div>
      {children}
    </dialog>
  );
}
