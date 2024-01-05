import homeLogo from '/public/imgs/cyberpunk-logo.png';
import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';

export default function HomePage() {
  return (
    <div className="bg-home-bg bg-no-repeat bg-cover grid grid-cols-[60%_40%] w-screen h-screen m-auto">
      <div className="w-full h-full relative inset-0 box-shadow-inner">
        <Image
          className="w-[70%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute object-contain drop-shadow-[0px_10px_10px_#6a6c03]"
          src={homeLogo}
          alt="Cyberpunk 2077"
          priority
        />
      </div>
      <div className="bg-zinc-800 box-shadow-left flex items-center justify-center w-full">
        <AuthForm />
      </div>
    </div>
  );
}
