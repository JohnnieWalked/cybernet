import Image from 'next/image';
import standartAvatar from '/public/imgs/judy-avatar.png';

type UserAvatarProps = {
  avatarSRC: string | null | undefined;
  children?: React.ReactNode;
  imageClasses?: string;
};

export default function UserAvatar({
  avatarSRC,
  children,
  imageClasses,
}: UserAvatarProps) {
  return (
    <div className="relative h-full self-center border-cyan-800 rounded-[100%]">
      {avatarSRC ? (
        <Image
          className={`w-full h-full object-center object-cover ${imageClasses}`}
          priority
          src={avatarSRC}
          fill
          placeholder="blur"
          blurDataURL={avatarSRC}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="User Avatar"
        />
      ) : (
        <Image
          className={`w-full h-full object-center object-cover ${imageClasses}`}
          src={standartAvatar}
          alt="Standart Avatar"
          priority
        />
      )}
    </div>
  );
}
