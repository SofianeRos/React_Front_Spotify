import React from "react";
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const Controls = ({
  isPlaying,
  currentSongs,
  isActive,
  repeat,
  shuffle,
  setRepeat,
  setShuffle,
  handlePlayPause,
  handleNextSong,
  handlePrevSong,
}) => {
  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      {/* bouton repeat */}
      <BsArrowRepeat
        size={20}
        color={repeat ? "rgba(30,215,96,1)" : "#fff"}
        className="cursor-pointer"
        onClick={() => setRepeat(!repeat)}
      />
      {/* on affiche le bouton precedent si on a un tableau de chansons */}
      {currentSongs?.length > 1 && (
        <MdSkipPrevious
          size={30}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
      )}
      {/* bouton play/pause */}
      {isPlaying && isActive ? (
        // on affiche le boutons pause
        <BsFillPauseFill
          size={45}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      )}
            {/* on affiche le bouton suivant si on a un tableau de chansons */}
      {currentSongs?.length > 1 && (
        <MdSkipNext
          size={30}
          color="#fff"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      )}
        {/* bouton shuffle */}
        <BsShuffle
          size={20}
          color={shuffle ? "rgba(30,215,96,1)" : "#fff"}
          className="cursor-pointer"
          onClick={() => setShuffle(!shuffle)}
        />
    </div>
  );
};

export default Controls;
