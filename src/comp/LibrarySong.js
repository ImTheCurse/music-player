import React from "react";


function librarySong({song,songs,setCurrentSong,id,key,audioRef,isPlaying,setSongs}){
    async function songSelectHandler(){
        await setCurrentSong(song);
        //add active state
        const newSongs = songs.map((song) => {
            if(song.id === id){      //check if the id of the state is equal to the specific song
               return {...song,active: true,}
            };
            return {...song, active: false}
        });
        setSongs(newSongs);
        //check if 
        if(isPlaying) audioRef.current.play();
    }

    return (
        <div onClick = {songSelectHandler} className={`library-song-container ${song.active? 'selected':""}`}>
            <img alt = {song.name} src = {song.cover} ></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>

    );
};


export default librarySong;