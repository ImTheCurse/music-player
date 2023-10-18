import React,{useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';


function Player({currentSong,setCurrentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,setSongs}){
    //useEffect
    useEffect(() => {
        //add active state
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){      //check if the id of the state is equal to the specific song
               return {...song,active: true,}
            };
            return {...song, active: false}
        });
        setSongs(newSongs);        
    },[currentSong])
    
    //Event Handlers
    function playSongHandler(){
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            return;
        }
        audioRef.current.play();
        setIsPlaying(!isPlaying);
    }


    function getTime(time){
        return (Math.floor(time/60) + ":" + ("0"+Math.floor(time%60)).slice(-2));
    }

    function dragHandler(event){
        audioRef.current.currentTime = event.target.value;
        setSongInfo({...songInfo,currentTime:event.target.value});
    }

    async function skipTrackHandler(direction){
        let currentIdx = songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIdx + 1) % songs.length])
        }
        if(direction === 'skip-back'){
            if((currentIdx - 1) % songs.length === -1){
                await setCurrentSong(songs[(songs.length - 1)]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIdx - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play();
    }

    //adding styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPrecentage}%)`
    }
    

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.curretTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input 
                    min = {0} 
                    max = {songInfo.duration || 0} 
                    value={songInfo.curretTime} 
                    onChange={dragHandler}
                    type = "range" />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration): "0:00"}</p>
            </div>
            <div className="player-control">
            <FontAwesomeIcon 
            onClick={()=> skipTrackHandler('skip-back')} 
            className="skip-back" 
            size = "2x" 
            icon = {faAngleLeft}
            />

            <FontAwesomeIcon 
            onClick={playSongHandler} 
            className="play" 
            size = "2x" 
            icon = {isPlaying?faPause:faPlay}
            
            />

            <FontAwesomeIcon 
            onClick={()=> skipTrackHandler('skip-forward')} 
            className="skip-forward" 
            size = "2x" 
            icon = {faAngleRight}
            />
            
            </div>
            
        </div>

    );
};


export default Player;