import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../store/player/playerSlice';
import Track from './Track';
import Controls from './Controls';
import SeekBar from './SeekBar';
import Player from './Player';

const MusicPlayer = () => {
// on va recuperer toutes les donnees du slice palyer 

const {activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying} = useSelector((state) => state.player)

// on va declarer nos states 

const [shuffle, setShuffle] = useState(false); // mode aleatoire
const [repeat, setRepeat] = useState(false); // mode repeat
const [volume, setVolume] = useState(0.3); // volume de 0 a 1
const [duration, setDuration] = useState(0); // duree totale de la chanson
const [seekTime, setSeekTime] = useState(0); // temps actuel de la chanson
const [appTime, setAppTime] = useState(0); // temps actuel de la musique 

// on recupere le hook dispatach

const dispatch = useDispatch();

useEffect(() => {
  // si le store contient un tableau de chansons, on dispatch playPause a true 
  if(currentSongs?.length) dispatch(playPause(true));
}, [currentIndex]) // si current index change on recharge le composant 

// on definit nos methode 

//methode pour le play/pause
const handlePlayPause = () => {
    if(!isActive) return;

    // si une chanson est active on dispatch playPause
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true))
}

// methode pour avancer d'une piste 

const handleNextSong = () => {
    if(!shuffle) {
        dispatch(nextSong((currentIndex + 1) % currentSongs?.length))
    }else{
        dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)))
    }
};

// methode pour reculer d'une piste

const handlePrevSong = () => {
    if(currentIndex === 0) {
    // si on est a la premiere chanson, on va a la derniere
        dispatch(prevSong(currentSongs?.length - 1))
    }else if(shuffle){
        dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)))
    }else{
        dispatch(prevSong(currentIndex - 1))
    }
};
return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between mt-5">
        <Track  
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
        />
        <div className="flex flex-1 flex-col items-center justify-center">
            <Controls
            isPlaying={isPlaying}
            currentSongs={currentSongs}
            isActive={isActive}
            repeat={repeat}
            shuffle={shuffle}
            setRepeat={setRepeat}
            setShuffle={setShuffle}
            handlePlayPause={handlePlayPause}
            handleNextSong={handleNextSong}
            handlePrevSong={handlePrevSong}
            />
            {/* barre de progression de la musique */}
            <SeekBar 
            value={appTime} // valeur actuelle de la barre de progression
            min="0" // valeur minimale de la barre de progression
            max={duration} // duree totale de la musique
            onInput={(event) => setSeekTime(event.target.value)} // met a jour le temps de la musique quand on interagit avec la barre de progression
            setSeekTime={setSeekTime} // met a jour le temps de la musique quand on interagit avec la barre de progression
            appTime={appTime} // temps actuel de la musique

            />
            {/* le player */}
            <Player 
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
            />
        </div>
    </div>
)






  return (
    <div>MusicPlayer</div>
  )
}

export default MusicPlayer