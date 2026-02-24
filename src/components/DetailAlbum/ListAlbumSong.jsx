import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "../Services/PlayPause";
import { setActiveAlbum, setActiveSong } from "../../store/player/playerSlice";
import { BiTime } from "react-icons/bi";
import { tableIcon } from "../../constants/appConstant";

const ListAlbumSong = ({ dataAlbum }) => {
  // on declare nos const
  const data = dataAlbum;
  const songs = dataAlbum?.songs;
  // on declare nos state
  const [isHover, setIsHover] = useState(-1);
  const [songId, setSongId] = useState(null);
  // on recup les donnees du stoe
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  // on recupere les hooks
  const dispatch = useDispatch();

  // methode quand on met pause
  const handlePauseClick = () => {
    dispatch(PlayPause(false));
  };

  // methode quand on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(PlayPause(true));
  };
  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 pb-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-white_01">
              <th
                className="pb-3 pt-1 w-12 text-gray-400 font-normal text-sm"
                scope="col"
              >
                #
              </th>
              <th
                className="pb-3 pt-1 w-12 text-gray-400 font-normal text-sm"
                scope="col"
              >
                TITRE
              </th>
              <th
                className="pb-3 pt-1 w-12 text-gray-400 font-normal text-sm text-right"
                scope="col"
              >
                <BiTime style={tableIcon} className="inline-block" />
              </th>
            </tr>
          </thead>
          <tbody>
            {songs && songs.map((row, index) => {
                const minutes = Math.floor(row.duration / 60);
                const secondes = Math.floor(row.duration % 60);
                const duration = secondes < 10 ? `${minutes}:0${secondes}` : `${minutes}:${secondes}`;
                const isActive = activeSong?.title === row?.title && isPlaying;
                return(
                    <tr 
                        className={`border-b border-white/5 transition-colors group ${isActive ? 'text-green': 'text-gray-300 hover:text-white'}`}
                        key={row.id ?? index}
                        onMouseEnter={() => setIsHover(index)}
                        onMouseLeave={() => setIsHover(-1)}

                    >
                        <td className="py-3 pr-2 align-middle w-12">
                            {isHover !== index ?(
                                <span className="text-sm">{index + 1}</span>
                            ) : (
                                <PlayPause 
                                size="16px"
                                songs={songs}
                                handlePlay={() => handlePlayClick(index)}
                                handlePause={handlePauseClick}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                index={index}
                                data={data}
                                />
                            )}
                        </td>
                        <td className="py-3 font-medium truncate">{row.title}</td>
                        <td className="py-3 w-14 text-right text-sm text-gray-400 tabular-nums">{duration}</td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAlbumSong;
