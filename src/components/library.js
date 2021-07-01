import React from "react";
import LibrarySong from "./librarySong";
const library = ({ songs, setcurrentSong,audioRef,isPlaying,setsongs, libraryOpen }) => {
  return (
    <div className={`library ${libraryOpen ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setcurrentSong={setcurrentSong}
            song={song}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setsongs={setsongs}
          />
        ))}
      </div>
    </div>
  );
};

export default library;
