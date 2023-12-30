'use client';

import { useFormStatus } from 'react-dom';

type FormButtonProps = {
  children: React.ReactNode;
};

export default function FormButtonPrimary({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="cybr-btn bg-cyan-600">
      {children}
      <span aria-hidden></span>
      <span aria-hidden className="cybr-btn__glitch">
        {children}
      </span>
    </button>
  );
}
