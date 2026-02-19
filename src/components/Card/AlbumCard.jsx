import React from "react";
import { ALBUM_URL } from "../../constants/apiConstant";
import { Link } from "react-router-dom";
import PlayPause from "../Services/PlayPause";
import { useDispatch } from "react-redux";
import { playPause, setActiveAlbum, setActiveSong } from "../../store/player/playerSlice";

const AlbumCard = ({
  data,
  songs,
  activeSong,
  isPlaying,
  index,
  artist = "inconnu",
}) => {
  // on declare des variables de datas
  const imgAlbum = `${ALBUM_URL}/${data?.imagePath}`;
  const albumId = data?.id ?? 0;
  const albumName = data?.title ?? "Album inconnu";
  const artistName = data?.artist?.name ?? artist;

  // on recupere le hook de dispatch 

  const dispatch = useDispatch();

  // metode quand on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  // methode quand on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({songs, data, index}));
    dispatch(setActiveAlbum(data));
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col items-center w-62.5 p-4 bg-white_01 hover:bg-white_05 transition-all ease-in-out duration-500 animate-slideup rounded-lg cursor-pointer group">
      <div className="relative w-full flex flex-col">
        <Link to={`/detail/${albumId}`}>
          <img
            src={imgAlbum}
            alt={`image de l'album ${albumName}`}
            className="mx-auto rounded-lg object-cover h-52 w-52"
          />
        </Link>
        {/* TODO: ici le bouton play/pause */}
        <div
          className={`absolute ${activeSong?.title === songs[index]?.title ? "flex" : "hidden"} group-hover:flex right-3 bottom-5`}
        >
          <div className="group-hover:animate-slideup2 bg-black outline-none rounded-full group-hover:duration-75 overflow-hidden">
            <PlayPause
            songs={songs}
            activeSong={activeSong}
            isPlaying={isPlaying}
            index={index}
            data={data}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(index)}
            />
          </div>
        </div>
        <Link to={`/detail/${albumId}`}>
          <div className="mt-4 flex flex-col">
            <p className="text-white text-xl truncate font-bold">{albumName}</p>
            <p className="text-white text-sm truncate">{artistName}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AlbumCard;
