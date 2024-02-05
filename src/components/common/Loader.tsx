import { BarLoader } from 'react-spinners';

type LoaderProps = {
  wrapperClassName?: string;
  width: string;
  color: string;
};

export default function Loader({
  width,
  color,
  wrapperClassName,
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 text-red-400 ${wrapperClassName}`}
    >
      <BarLoader width={width} color={color} />
      Breaching...
    </div>
  );
}
