import react, { useState } from "react";
import "./styles/app.scss";
//adding component
import Player from "./components/Player";
import Song from "./components/song";

//importing data
import data from "./data";
function App() {
  //state
  const [songs, setsongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="app">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;
