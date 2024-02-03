'use client';

/* hooks */
import { useRef, useEffect } from 'react';

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
      {children}
    </dialog>
  );
}
