'use client';

import { useFormState } from 'react-dom';

/* components */
import FormButtonPrimary from '@/components/auth/FormButtonPrimary';

export default function PostForm() {
  return (
    <form>
      <FormButtonPrimary className="post-btn">CREATE A POST</FormButtonPrimary>
    </form>
  );
}
