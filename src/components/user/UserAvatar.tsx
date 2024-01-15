import Image from 'next/image';
import standartAvatar from '/public/imgs/judy-avatar.png';

type UserAvatarProps = {
  avatarSRC: string | null | undefined;
  children?: React.ReactNode;
};

export default function UserAvatar({ avatarSRC, children }: UserAvatarProps) {
  return (
    <div className="h-full drop-shadow-avatar self-center border-cyan-800 rounded">
      {avatarSRC ? (
        <Image
          className="w-auto h-full object-contain"
          priority
          src={avatarSRC}
          alt="User Avatar"
        />
      ) : (
        <Image
          className="w-auto h-full object-contain"
          src={standartAvatar}
          alt="Standart Avatar"
          priority
        />
      )}
    </div>
  );
}
