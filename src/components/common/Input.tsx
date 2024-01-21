'use client';

import { useRef, useEffect, useState } from 'react';

type InputProps = {
  passValueToParent?: (value: string | undefined) => void;
  defaultValue?: string;
  name: string;
  label: string;
  type: 'text' | 'password';
  errors?: string[];
  classWrapper?: string;
};

export default function Input(props: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string | undefined>();

  const handleInputChange = (value: string) => {
    if (!inputRef.current) return;
    setInputValue(value);
  };

  /* debounce */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!props.passValueToParent) return;
      props.passValueToParent(inputValue);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue, props]);

  return (
    <div
      className={
        `flex flex-col relative form-focus transition-all mb-12 ` +
        props.classWrapper
      }
    >
      <input
        defaultValue={props.defaultValue}
        onChange={(e) => handleInputChange(e.target.value)}
        ref={inputRef}
        className=" bg-transparent p-1 border-b-2 outline-none focus:border-cyan-300 transition-all"
        type={props.type}
        name={props.name}
        id={props.name}
        required
      />
      <label className="absolute top-0 transition-all" htmlFor={props.name}>
        {props.label}
      </label>

      {props.errors &&
        props.errors.map((item, i) => (
          <div
            className=" bg-red-900 border rounded border-red-500 mt-2 p-2 text-red-300"
            key={i}
          >
            {item}
          </div>
        ))}
    </div>
  );
}
