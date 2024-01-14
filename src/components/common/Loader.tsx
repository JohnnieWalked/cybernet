import { BarLoader } from 'react-spinners';

type LoaderProps = {
  width: string;
  color: string;
};

export default function Loader({ width, color }: LoaderProps) {
  return (
    <div className=" flex flex-col justify-center items-center gap-3 text-red-400">
      <BarLoader width={width} color={color} />
      Breaching...
    </div>
  );
}
