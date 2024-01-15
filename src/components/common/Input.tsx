'use client';

import { useRef } from 'react';

type InputProps = {
  setInputValue?: (value: string) => void;
  name: string;
  label: string;
  type: 'text' | 'password';
  errors?: string[];
  classWrapper?: string;
};

export default function Input(props: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (props.setInputValue) props.setInputValue(value);
  };

  return (
    <div
      className={
        `flex flex-col relative form-focus transition-all mb-12 ` +
        props.classWrapper
      }
    >
      <input
        onChange={handleInputChange}
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
