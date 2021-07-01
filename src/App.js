import  { useState, useRef } from "react";
import "./styles/app.scss";
//adding component
import Player from "./components/Player";
import Song from "./components/song";
import Library from "./components/library";
import Nav from "./components/nav";
//importing data
import data from "./data";
//importing util

function App() {
  //state
  const [songs, setsongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    AnimationPercentage:0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);
  //handlers
  const TimeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationP = Math.round((roundedCurrent / roundedDuration) * 100);
    
    setSongInfo({ ...songInfo, 
      currentTime: current, 
      duration, 
      AnimationPercentage:animationP });
  };
  const songEndHandler = async ()=>{
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };
  return (
    <div className={`app ${libraryOpen ? "library-active" : ""}`}>
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setcurrentSong={setcurrentSong}
        setsongs={setsongs}
      />
      <Library
        audioRef={audioRef}
        libraryOpen={libraryOpen}
        songs={songs}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setsongs={setsongs}
      />
      <audio
        onTimeUpdate={TimeUpdateHandler}
        onLoadedMetadata={TimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
