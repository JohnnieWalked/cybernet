'use client';

import { useFormStatus } from 'react-dom';
import { BarLoader } from 'react-spinners';

type FormButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FormButtonPrimary({
  children,
  className,
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`flex items-center justify-center cybr-btn bg-cyan-600 ${className}`}
    >
      {pending ? (
        <BarLoader height={'7px'} width="60%" color="var(--yellow)" />
      ) : (
        children
      )}
      <span aria-hidden></span>
      <span aria-hidden className="cybr-btn__glitch">
        {pending ? (
          <BarLoader height={'7px'} width="60%" color="var(--yellow)" />
        ) : (
          children
        )}
      </span>
    </button>
  );
}
