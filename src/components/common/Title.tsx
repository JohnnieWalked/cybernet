type TitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-cyan-400 text-4xl font-bold pt-unit-2xl">{children}</h1>
  );
}
