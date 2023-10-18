import React from "react";
import LibrarySong from "./LibrarySong";

function library({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}){
    return (
        <div className={`library ${libraryStatus ? "active-library" : " "}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                <LibrarySong 
                key = {song.id} 
                id = {song.id} 
                setCurrentSong = {setCurrentSong} 
                songs = {songs} 
                song = {song}
                audioRef = {audioRef}
                isPlaying = {isPlaying}
                setSongs = {setSongs}
                />)
                
                )}
                
            </div>

       </div> 

    )
}

export default library;