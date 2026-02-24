import React from "react";
import HeaderDetail from "./HeaderDetail";
import ToolbarDetail from "./ToolbarDetail";
import ListAlbumSong from "./ListAlbumSong";
import AlbumSuggestion from "./AlbumSuggestion";

const DetailAlbum = ({ dataAlbum, albumByGenre }) => {
  return (
    <>
      <HeaderDetail dataAlbum={dataAlbum} />
      <ToolbarDetail dataAlbum={dataAlbum} />
      <ListAlbumSong dataAlbum={dataAlbum} />
      <AlbumSuggestion albumByGenre={albumByGenre} />
    </>
  );
};

export default DetailAlbum;
