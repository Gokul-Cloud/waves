import React from 'react'

const librarySong = ({song,setcurrentSong,audioRef,songs, id,isPlaying,setsongs}) => {
    const songSelectHandler=async ()=>{
        await setcurrentSong(song);
        //add active state
        const newSongs = songs.map((song)=>{
            if(song.id===id){
                return{
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,active:false,
                }
            }
        });
        setsongs(newSongs);
        if(isPlaying) audioRef.current.play();
    };
    return (
        <div onClick={songSelectHandler}  className={`library-song ${song.active ? 'selected':""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
           
            
        </div>
    )
}

export default librarySong
