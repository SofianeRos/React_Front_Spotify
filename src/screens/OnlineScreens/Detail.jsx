import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumDetail } from '../../store/album/albumSlice';
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

const {loading, albumDetail} = useSelector(selectAlbumData);  

  return (
    loading ? <PageLoader />:
    <DetailAlbum album={albumDetail} />
  )
}

export default Detail