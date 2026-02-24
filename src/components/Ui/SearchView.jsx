import React, { useState } from "react";
import { useSelector } from "react-redux";
import selectAlbumData from "../../store/album/albumSelector";
import AlbumCard from "../Card/AlbumCard";
import ArtistCard from "../Card/ArtistCard";

const SearchView = ({ word }) => {
  // on declare nos state
  const [searchWord, setSearchWord] = useState(word);
  // on recupere les infos slice

  const { searchAlbum, searchTitle, searchArtist } =
    useSelector(selectAlbumData);
  // on recupere les info du slice player
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  // on declare nos constantes

  const dataAlbum = searchAlbum.member;
  const dataTitle = searchTitle.member;
  const dataArtist = searchArtist.member;

  return (
    <>
      {/* cas ou il n'y a pas de resultat */}
      {dataAlbum &&
        dataAlbum?.length === 0 &&
        dataTitle &&
        dataTitle?.length === 0 &&
        dataArtist &&
        dataArtist?.length === 0 && (
          <h2 className="font-bold text-3xl text-white text-left mt-10 mb-4">
            {`Aucun résultat trouvé pour "${searchWord}"`}
          </h2>
        )}
      {/* parti album */}
      {dataAlbum && dataAlbum.length > 0 ? (
        <h2 className="ml-6 text-2xl font-bold text-white mb-6">
          Albums <span className="text-gray-400">({dataAlbum.length})</span>
        </h2>
      ) : null}
      <div className="flex flex-wrap">
        {dataAlbum &&
          dataAlbum.map((data, index) => (
            <div className="p-3 m-3" key={`album_${index}`}>
              <AlbumCard
                data={data}
                songs={data?.songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                index={0}
              />
            </div>
          ))}
      </div>
      {/* parti artiste */}
      {dataArtist && dataArtist.length > 0 ? (
        <h2 className="ml-6 text-2xl font-bold text-white mb-6">
          Artistes <span className="text-gray-400">({dataArtist.length})</span>
        </h2>
      ) : null}
      <div className="flex flex-wrap">
        {dataArtist &&
          dataArtist.map((data, index) => (
            <div className="p-3 m-3" key={`artist_${index}`}>
              <ArtistCard dataArtist={data} />
            </div>
          ))}
      </div>
      {/* parti titre */}
      {dataTitle && dataTitle.length > 0 ? (
        <h2 className="ml-6 text-2xl font-bold text-white mb-6">
          Titres <span className="text-gray-400">({dataTitle.length})</span>
        </h2>
      ) : null}
      <div className="flex flex-wrap">
        {dataTitle &&
          dataTitle.map((data, index) => (
            <div className="p-3 m-3" key={`song_${index}`}>
              <AlbumCard
                data={data}
                songs={data?.songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                index={0}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchView;
