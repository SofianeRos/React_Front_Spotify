import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../../store/album/albumSlice';
import selectAlbumData from '../../store/album/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/Card/AlbumCard';

const Home = () => {

  // on récupère le hook dispatch pour pouvoir executer les actions du slice
  const dispatch = useDispatch();

  useEffect(() => {
    //dans le useEffect on dispatch la méthode fetchAlbums pour récupérer les albums en bdd
    dispatch(fetchAlbums())
  }, [dispatch])
  
  // on récupère les données des albums et le loading avec useSelector
  const {loading, albums} = useSelector(selectAlbumData);

  const dataAlbum = albums.member;
  // on recupere les donnees du slice player 
  const {activeSong, isPlaying} = useSelector((state) => state.player);

  return (
    loading ? <PageLoader/> :
    <div className="flex flex-col">
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Tous les albums</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8 mx-2">
        {dataAlbum && dataAlbum.map((data, index) => (
          <AlbumCard 
            key={index} // pour que chaque enfant de la boucle soit unique 
            data={data} // les donne de l'alabum
            songs={data.songs} // les chansons de l'album
            activeSong={activeSong} // la chanson en cours de lecture
            isPlaying={isPlaying} // si le player est en mode lecture ou pause
            index={0} // l'index de la chanson dans son tableau (ici on met 0 pour que le play/pause soit sur la premiere chanson de l'album)
          />
        ))}
      </div>
    </div>
  )
}

export default Home