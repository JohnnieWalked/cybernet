'use client';

import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';

/* server actions */
import * as actions from '@/actions';

/* components */
import FormButtonPrimary from '../common/FormButtonPrimary';
import Input from '../common/Input';
import ScreenPopover from '../common/ScreenPopover';

export default function LoginForm() {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [formSignUpState, signUpAction] = useFormState(actions.signUp, {
    errors: {},
  });

  /* change form type after registration */
  useEffect(() => {
    if (formSignUpState.success) setFormType('login');
  }, [formSignUpState]);

  /* login form */
  const renderedLoginForm = (
    <>
      <form className="flex flex-col" action="">
        <Input type="text" name="login" label="Username or email" />
        <Input type="password" name="password" label="Password" />
        <FormButtonPrimary>Login</FormButtonPrimary>
      </form>
      <div className="mt-8 text-center">Not a member?</div>
      <div className=" flex mt-2 justify-between items-center text-lg">
        <span className="w-[30%] h-[1px] bg-slate-400"></span>
        <button
          onClick={() => setFormType('signup')}
          className="cursor-pointer underline hover:text-cyan-300 font-bold transition-colors"
        >
          Sign up
        </button>
        <span className="w-[30%] h-[1px] bg-slate-400"></span>
      </div>
    </>
  );

  /* sign up form */
  const renderedSignUpForm = (
    <div>
      <form className="flex flex-col" action={signUpAction}>
        <Input
          errors={formSignUpState?.errors.name}
          type="text"
          name="name"
          label="Name"
        />
        <Input
          errors={formSignUpState?.errors.username}
          type="text"
          name="username"
          label="Username (must be unique)"
        />
        <Input
          errors={formSignUpState?.errors.email}
          type="text"
          name="email"
          label="Email"
        />
        <Input
          errors={formSignUpState?.errors.password}
          type="password"
          name="password"
          label="Password"
        />
        <Input
          errors={formSignUpState?.errors.password}
          type="password"
          name="repeatPassword"
          label="Repeat Password"
        />
        <FormButtonPrimary>Sign Up</FormButtonPrimary>
      </form>
      <div className=" flex mt-10 justify-between items-center text-lg">
        <span className="w-[30%] h-[1px] bg-slate-400"></span>
        <button
          onClick={() => setFormType('login')}
          className="cursor-pointer underline hover:text-cyan-300 transition-colors font-bold"
        >
          Login
        </button>
        <span className="w-[30%] h-[1px] bg-slate-400"></span>
      </div>
    </div>
  );

  return (
    <div className="text-white flex flex-col justify-between">
      <div className="text-center mb-10">
        <h3 className=" text-2xl m-2 font-light italic text-cyan-400">
          Welcome to
        </h3>
        <h1 className="text-5xl font-bold uppercase tracking-wider text-[yellow] ">
          CyberNet
        </h1>
      </div>

      {formType === 'login' ? renderedLoginForm : renderedSignUpForm}

      {/* popover message */}
      {formSignUpState.success && (
        <ScreenPopover currrentState={formSignUpState.success}>
          Successful registration!
        </ScreenPopover>
      )}
    </div>
  );
}
