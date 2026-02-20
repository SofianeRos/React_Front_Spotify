import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { USER_INFOS } from "../../constants/appConstant";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites } from "../../store/user/userSlice";
import {
  playPause,
  setActiveAlbum,
  setActiveSong,
} from "../../store/player/playerSlice";
import { fetchAddRemoveFavorite } from "../../services/userFavoriteService";
import PageLoader from "../Loader/PageLoader";
import PlayPause from "../Services/PlayPause";
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from "react-icons/ai";
import ButtonLoader from "../Loader/ButtonLoader";
import { Collapse } from "react-collapse";
import InfoCollapse from "./InfoCollapse";

const ToolbarDetail = ({ dataAlbum }) => {
  // on declare nos constantes pour les infos de l'album
  const data = dataAlbum; // info de l'album
  const songs = dataAlbum?.songs; // tableau de chansons
  const albumId = dataAlbum?.id; // id de l'album
  // recuperation de l'id user depuis le contexte
  // const {userId} = useAuthContext();
  // recuperation de l'id user depuis le localStorage
  const userId = localStorage.getItem(USER_INFOS)
    ? JSON.parse(localStorage.getItem(USER_INFOS)).userId
    : null;

  // on declare nos states
  const [index, setIndex] = useState(0); // index de la chanson en cours de lecture
  const [isLoading, setIsLoading] = useState(false); // flag pour afficher loader lors de la mise en favorie
  const [isCollapse, setIsCollapse] = useState(false); // pour ouvrir ou fermer le menu de partage
  const [isInList, setIsInList] = useState(false); // flag pour savoir si l'album est dans la liste de favoris de l'utilisateur
  const [listArray, setListArray] = useState([]); // tableau pour stocker les albums favoris de l'utilisateur

  // on recupere les hooks
  const dispatch = useDispatch();

  // on va faire les courses , on recupere les infos du store
  const { isPlaying, activeSong } = useSelector((state) => state.player); // isPlaying pour savoir si une chanson est en cours de lecture, activeSong pour savoir quelle chanson est en cours de lecture

  // on recupere la liste des favoris de l'utilisateur depuis le store
  const { loading, userFavorites } = useSelector((state) => state.users);

  // methode qui verifie si l'album est dans la liste de favoris de l'utilisateur
  const checkFavorite = () => {
    if (userFavorites) {
      const idArray = userFavorites.map((item) => `/api/albums/${item.id}`); // on recupere un tableau avec les id des albums favoris de l'utilisateur

      // on set la liste dan notre listArray en supprimant les doublons avec un Set
      setListArray([...new Set(idArray)]); // on verifie si l'album est dans la liste de favoris de l'utilisateur

      // on verifie si l'album est dans la liste de favoris de l'utilisateur
      if (idArray.includes(`/api/albums/${albumId}`)) {
        setIsInList(true);
      } else {
        setIsInList(false);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchUserFavorites(userId));
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    checkFavorite();
  }, [loading]);

  // methode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  // methode lorsqu'on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  };

  // methode pour ouvrir ou fermer le collapse

  const handleCollapseClick = () => {
    setIsCollapse(!isCollapse);
  };

  // methode pour mettre ou enlever l'album des favoris de l'utilisateur

  const toggleFavorite = async () => {
    setIsLoading(true); // on affiche le loader
    // cree une copie de la liste de favoris de l'utilisateur
    let updatedListArray = [...listArray];

    // on verifie si l'album est dans la liste
    if (isInList) {
      // si l'album est dans la liste, on le supprime de la liste
      updatedListArray = listArray.filter(
        (item) => item !== `/api/albums/${albumId}`,
      );
    } else {
      // si l'album n'est pas dans la liste, on l'ajoute à la liste
      updatedListArray.push(`/api/albums/${albumId}`);
    }
    // on appelle le service pour mettre à jour la liste de favoris de l'utilisateur dans la base de données
    await fetchAddRemoveFavorite(updatedListArray, userId);

    setListArray(updatedListArray); // on met à jour la liste dans le state
    setIsInList(!isInList); // on inverse le flag pour savoir si l'album est dans la liste de favoris de l'utilisateur
    setIsLoading(false); // on cache le loader
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <div className="flex items-center gap-1 px-4 sm:px-6 lg:px-8 py-4">
        <div className="cursor-pointer">
          <PlayPause
            songs={songs}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(index)}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            data={data}
          />
        </div>
        <button
          type="button"
          onClick={toggleFavorite}
          className="p-3 rounded-full text-white/70 hover:text-green hover:scale-105 transition-all cursor-pointer"
          aria-label={isInList ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isLoading ? (
            <ButtonLoader size={26} />
          ) : isInList ? (
            <AiFillHeart size={28} className="text-green" />
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </button>
        <button type="button"
          onClick={handleCollapseClick}
          className='p-3 rounded-full text-white/70 hover:text-green
          hover:scale-105 transition-all cursor-pointer' aria-label=
          {isCollapse ? "Masquer les infos" : "Afficher les infos"}
          >
            {isCollapse ? <AiFillInfoCircle size={28} className="text-green" /> : (<AiOutlineInfoCircle size={28} />)}
        </button>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <Collapse isOpened={isCollapse}>
          <InfoCollapse dataAlbum={dataAlbum} />
        </Collapse>
      </div>
    </>
  );
};

export default ToolbarDetail;
