import React from "react";
import { data, Link } from "react-router-dom";
import { ALBUM_URL, ARTIST_URL } from "../../constants/apiConstant";
import { totalDuration } from "../../services/toolsService";

const HeaderInfo = ({ dataAlbum }) => {
  // on recupere l'image de lartiste si il y en a une sinon on recupere limage de l'album
  const imgPath = dataAlbum?.artist?.imagePath
    ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}`
    : `${ALBUM_URL}/${dataAlbum?.imagePath}`;

  // on formate la date de sortie de l'album (seulement l'annee )
  const releaseDate = dataAlbum?.releaseDate
    ? new Date(dataAlbum?.releaseDate).getFullYear().toString()
    : "Date de sortie inconnue";

  // on definit le nombre de titre par album
  const nbTitle = dataAlbum?.songs
    ? dataAlbum?.songs?.length > 1
      ? `${dataAlbum?.songs?.length} titres`
      : `${dataAlbum?.songs?.length} titre`
    : "0 titre";

  //mini component pour le separateur
  const separator = <span className="text-gray-500 mx-1.5">•</span>;

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-0 gap-y-1 mt-3">
      <Link to={"#"} className="inline-flex items-center gap-2 group">
        <img
          src={imgPath}
          alt={dataAlbum?.artist?.name ?? "artist inconnu"}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-green transition"
        />
        <span className="font-semibold text-white text-sm sm:text-base group-hover:text-green transition">
          {dataAlbum?.artist?.name ?? "artist inconnu"}
        </span>
      </Link>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">{releaseDate}</span>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">{nbTitle}</span>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">
        {dataAlbum?.songs?.length > 0 ? totalDuration(dataAlbum) : "-"}
      </span>
    </div>
  );
};

export default HeaderInfo;
