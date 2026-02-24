import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArtistDetail } from '../../store/artist/artistSlice';
import PageLoader from '../../components/Loader/PageLoader';
import BiographyArtist from '../../components/DetailArtist/BiographyArtist';
import ListAlbumArtist from '../../components/DetailArtist/ListAlbumArtist';
import HeaderDetail from '../../components/DetailArtist/HeaderDetail';

const ArtistDetail = () => {
    // on doit recuperer l'id 
    const params = useParams();
    const { id } = params;

    // on recup le hook dispatch 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchArtistDetail(id));
    }, [dispatch, id])

    // on recup les datas de l'artist
    const {loading, artistDetail} = useSelector((state) => state.artists);
    
  return (
    loading ? <PageLoader /> :
    <>
        <HeaderDetail dataArtist={artistDetail}/>
        <BiographyArtist dataArtist={artistDetail}/> 
        <ListAlbumArtist dataArtist={artistDetail}/>  
    </>
  )
}

export default ArtistDetail