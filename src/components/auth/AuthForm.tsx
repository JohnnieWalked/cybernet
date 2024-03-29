'use client';

import { useFormState } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';

/* server actions */
import * as actions from '@/actions';

/* components */
import FormButtonPrimary from './FormButtonPrimary';
import Input from '../common/Input';

export default function AuthForm() {
  const [formType, setFormType] = useState<'signin' | 'signup'>('signin');
  const formRef = useRef<HTMLDivElement | null>(null);
  const [formSignUpState, signUpAction] = useFormState(actions.signUp, {
    errors: {},
  });
  const [formSignInState, signInAction] = useFormState(actions.login, {
    errors: {},
  });

  /* change form type after registration */
  useEffect(() => {
    if (formSignUpState.success) {
      setFormType('signin');
      toast.success('Successful registration!');
      toast.warning('We have sent You an email. Please, verify.');
    }
    if (formSignInState.success === false) {
      toast.warning('Confirmation email sent! Please, confirm before proceed.');
    }
  }, [formSignUpState, formSignInState]);

  /* signin form */
  const renderedSignInForm = (
    <>
      <form className="flex flex-col" action={signInAction}>
        <Input
          errors={formSignInState.errors._form}
          type="text"
          name="signin"
          label="Username or email"
        />
        <Input
          errors={formSignInState.errors._form}
          type="password"
          name="password"
          label="Password"
        />
        <FormButtonPrimary type="submit">Sign in</FormButtonPrimary>
      </form>
      <div className="flex mt-10 justify-center items-center text-lg">
        <button
          onClick={() => setFormType('signup')}
          className="cursor-pointer hover:underline hover:underline-offset-4 font-light"
        >
          Don&rsquo;t have an account?
        </button>
      </div>
    </>
  );

  /* signup form */
  const renderedSignUpForm = (
    <>
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

        {formSignUpState.errors._form ? (
          <div className=" bg-red-900 border rounded border-red-500 mt-2 p-2 text-red-300">
            {formSignUpState.errors._form.join(', ')}
          </div>
        ) : null}

        <FormButtonPrimary type="submit">Sign Up</FormButtonPrimary>
      </form>
      <div className="flex mt-10 justify-center items-center text-lg">
        <button
          onClick={() => setFormType('signin')}
          className="cursor-pointer font-light hover:underline hover:underline-offset-4"
        >
          Already have an account?
        </button>
      </div>
    </>
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

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={formType}
          addEndListener={(done) => {
            formRef.current?.addEventListener('transitionend', done, false);
          }}
          nodeRef={formRef}
          classNames="fade"
        >
          <div ref={formRef}>
            {formType === 'signin' ? renderedSignInForm : renderedSignUpForm}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
