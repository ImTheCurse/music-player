import React,{useState,useRef} from 'react';
import Player from './comp/player';
import Song from './comp/Song';
import './styles/app.scss';
import chillHop from './data';
import Library from './comp/Library';
import Nav from './comp/Nav';

function App() {
  //refrence to audio
  const audioRef = useRef(null);
  //states
  const [songs,setSongs] = useState(chillHop());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    curretTime: 0,
    duration: 0,
    animationPrecentage: 0,
});
  const [libraryStatus, setLibraryStatus] = useState(false);

function timeUpdateHandler(event){
  const current = event.target.currentTime;
  const duration = event.target.duration;
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(current);
  const animation = Math.round((roundedCurrent / roundedDuration)*100);
  setSongInfo({...songInfo,curretTime:current,duration,animationPrecentage: animation});
}

const songEndHandler = async() => {
  let currentIdx = songs.findIndex((song)=> song.id === currentSong.id);
  await setCurrentSong(songs[(currentIdx + 1) % songs.length])
  if(isPlaying){
    setTimeout(() => {audioRef.current.play()  }, 100);
 }
  
}

  return (
    <div className={`app ${libraryStatus ? 'library-active':''}`}>
      <Nav
      libraryStatus = {libraryStatus}
      setLibraryStatus = {setLibraryStatus}
      />

      <Song currentSong = {currentSong}/>

      <Player 
      audioRef = {audioRef} 
      setIsPlaying = {setIsPlaying} 
      isPlaying = {isPlaying} 
      currentSong = {currentSong}
      setCurrentSong = {setCurrentSong}
      songInfo = {songInfo}
      setSongInfo = {setSongInfo}
      songs = {songs}
      setSongs = {setSongs}
      />
      
      <Library 
      songs = {songs} 
      setCurrentSong = {setCurrentSong}
      audioRef = {audioRef}
      isPlaying = {isPlaying}
      setSongs = {setSongs}
      libraryStatus = {libraryStatus}
      />
      
      <audio 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate = {timeUpdateHandler} 
      ref = {audioRef} 
      src={currentSong.audio}>
      onEnded={songEndHandler}

      </audio>
    </div>
  );
}

export default App;
