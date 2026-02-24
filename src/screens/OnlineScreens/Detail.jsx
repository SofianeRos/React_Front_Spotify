import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumByGenre, fetchAlbumDetail } from '../../store/album/albumSlice';
import selectAlbumData from '../../store/album/albumSelector';
import DetailAlbum from '../../components/DetailAlbum';
import PageLoader from '../../components/Loader/PageLoader';

const Detail = () => {
// hook pour recuperer les parametres passer dans l'url
const params = useParams();

const {id} = params;

// on recupere le hook dispatch 
const dispatch = useDispatch();


useEffect(() => {
 dispatch(fetchAlbumDetail(id))
}, [dispatch, id])
const {loading, albumDetail, albumByGenre} = useSelector(selectAlbumData);  
useEffect(() => {
 dispatch(fetchAlbumByGenre(albumDetail?.genre)) 

}, [dispatch, albumDetail?.genre])

  return (
    loading ? <PageLoader />:
    <DetailAlbum dataAlbum={albumDetail} albumByGenre={albumByGenre} />
  )
}

export default Detail