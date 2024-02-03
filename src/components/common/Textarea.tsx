'use client';

type TextareaProps = {
  name: string;
  label: string;
  errors?: string[];
  classWrapper?: string;
  classTextArea?: string;
  classLabel?: string;
};

export default function Textarea(props: TextareaProps) {
  return (
    <div
      className={
        `flex flex-col relative form-focus transition-all mb-12 ` +
        props.classWrapper
      }
    >
      <textarea
        className={`resize-none flex h-52 bg-transparent p-1 border-b-2 outline-none focus:border-cyan-300 transition-all ${props.classTextArea}`}
        name={props.name}
        id={props.name}
        required
      />
      <label
        className={`absolute top-0 transition-all ${props.classLabel}`}
        htmlFor={props.name}
      >
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
