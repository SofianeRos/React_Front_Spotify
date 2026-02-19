import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../store/player/playerSlice';
import Track from './Track';
import Controls from './Controls';

const MusicPlayer = () => {
// on va recuperer toutes les donnees du slice palyer 

const {activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying} = useSelector((state) => state.player)
console.log(currentAlbum)

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

        </div>
    </div>
)






  return (
    <div>MusicPlayer</div>
  )
}

export default MusicPlayer