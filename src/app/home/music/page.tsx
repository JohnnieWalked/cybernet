/* components */
import MusicList from '@/components/music/MusicList';
import Title from '@/components/common/Title';
import SearchInput from '@/components/common/SearchInput';

interface MusicPageProps {
  searchParams: {
    song: string;
  };
}

export default async function MusicPage({ searchParams }: MusicPageProps) {
  const { song } = searchParams;

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-10">
      <Title>Music</Title>
      <SearchInput name="song" label="Search..." searchParamsKey="song" />
      <MusicList searchForSong={song} />
    </div>
  );
}
