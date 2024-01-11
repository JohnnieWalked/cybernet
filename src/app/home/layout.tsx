import MenuBar from '@/components/MenuBar';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="before:absolute before:inset-0 before:bg-slate-800 before:w-screen before:h-screen before:-z-10">
      <MenuBar />
      {children}
    </div>
  );
}