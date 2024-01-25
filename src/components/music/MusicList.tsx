/* components */
import MusicItem from './MusicItem';
import MusicPlayer from './MusicPlayer';

import { getAllMusic } from '@/data/music';

export default async function MusicList() {
  const playlist = await getAllMusic();

  if (!playlist) return 'Something went wrong.';

  const renderSongs = playlist.map((item) => (
    <MusicItem key={item.id} song={item} />
  ));

  return (
    <div className="musicList shadow-[0px_0px_10px_rgb(34,_211,_238)] grid relative grid-cols-[minmax(200px,_700px),_minmax(300px,_400px)] grid-rows-[minmax(200px,_600px)] before:bg-gradient-to-l before:from-black transition-all">
      <div>
        <MusicPlayer musicList={playlist} />
      </div>
      <div className="grid py-5 gap-3 w-full overflow-y-auto overflow-x-hidden scroll-smooth ">
        {renderSongs}
      </div>
    </div>
  );
}
