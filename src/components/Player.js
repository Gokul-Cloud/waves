import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/app.scss";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setcurrentSong,
  setsongs,
}) => {

   const activeLibraryHandler = (nextPrev)=>{
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setsongs(newSongs);
  };
  //event- handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const draghandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const SkiptrackHandler = async(direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setcurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if(isPlaying) audioRef.current.play();
        return;
      }
     await setcurrentSong(songs[currentIndex - 1]);
     activeLibraryHandler(songs[songs.length - 1]);
    }
    if(isPlaying) audioRef.current.play();
  };
  //add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.AnimationPercentage}%)`
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={draghandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track">

          </div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => SkiptrackHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => SkiptrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
