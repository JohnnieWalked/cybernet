'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import FormButtonPrimary from './FormButtonPrimary';
import { paths } from '@/routes';
import { toast } from 'react-toastify';

import * as actions from '@/actions';

export default function NewVerificationForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error('Missing token!');
      return;
    }

    actions
      .verificationToken(token)
      .then(({ success, error }) => {
        if (success) {
          toast.success('Successfuly verified!');
          setSuccess(true);
        }
        if (error) {
          toast.error(error);
        }
      })
      .catch((error) => {
        toast.error('Unexpected error happened...');
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="relative before:absolute before:w-full before:h-full before:bg-gif-verify grid place-items-center w-full h-screen before:bg-no-repeat before:bg-cover before:brightness-50 text-white ">
      <div className="relative text-center max-w-screen text-2xl z-10 border border-l-0 border-r-0 border-cyan-500">
        <div className="relative p-10 flex flex-col justify-center items-center w-screen h-full before:absolute before:bg-teal-950 before:opacity-50 before:inset-0 before:w-screen before:h-full before:-z-10 ">
          {success ? (
            <div className=" mb-10">Email verified!</div>
          ) : (
            <>
              Please, wait. <br /> We are verifying email...
              <BarLoader
                className="mt-10 mb-10"
                height={'7px'}
                width="30%"
                color="var(--yellow)"
              />
            </>
          )}
          <FormButtonPrimary type="button">
            <a href={paths.loginPage()}>back to login</a>
          </FormButtonPrimary>
        </div>
      </div>
    </div>
  );
}
