/* components */
import MusicList from '@/components/music/MusicList';
import Title from '@/components/common/Title';
import SearchInput from '@/components/common/SearchInput';

interface MusicPageProps {
  searchParams: {
    term: string;
  };
}

export default async function MusicPage({ searchParams }: MusicPageProps) {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-10">
      <Title>Music</Title>
      <SearchInput />
      <MusicList searchParams={searchParams} />
    </div>
  );
}
