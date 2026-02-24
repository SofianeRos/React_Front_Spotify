import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    loading: false,
    albums: [],
    albumDetail: {},
    albumByGenre: [],
    searchTitle: [],
    searchArtist: [],
    searchAlbum: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAlbums: (state, action) => {
      state.albums = action.payload
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload.member[0]
    },
    setAlbumByGenre: (state, action) => {
      state.albumByGenre = action.payload
    },
    setSearchAlbum: (state, action) => {
      state.searchAlbum = action.payload
  },
   setSearchTitle: (state, action) => {
      state.searchTitle = action.payload
  },
   setSearchArtist: (state, action) => {
      state.searchArtist = action.payload
  },
}
})

export const {setLoading, setAlbums, setAlbumDetail, setAlbumByGenre, setSearchAlbum, setSearchTitle, setSearchArtist} = albumSlice.actions;
/**
 * ==============================
 * PARTIE DES REQUETE SUR L'API
 * ==============================
 */
// methode qui recupere les albums actifs
export const fetchAlbums = (page = 1) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/albums?page=${page}&isActive=true`)

    dispatch(setAlbums(response.data));
  } catch (error) {
    console.log(`Erreur lors de la récupération des albums: ${error}`)
  }finally{
    dispatch(setLoading(false));
  }
}
// methode qui recupere les albums par id
export const fetchAlbumDetail = (id) => async (dispatch) => {
    try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/albums?id=${id}&isActive=true`)

    dispatch(setAlbumDetail(response.data));
  } catch (error) {
    console.log(`Erreur lors de la récupération du detail de l'album: ${error}`)
  }finally{
    dispatch(setLoading(false));
  }

}
// methode qui recupere les albums par genre
export const fetchAlbumByGenre = (genreArray) => async (dispatch) => {
try {
  dispatch(setLoading(true));
  //  on va boucler sur notre tableau de genre 
  let result = [];
  genreArray && genreArray.map(async (genre) => {
    const label = genre.label;
    const response = await axios.get(`${API_URL}/albums?page=1&genre.label=${label}&isActive=true`);
    result = result.concat(response.data.member);
    result = result.filter((album, index, self) => index === self.findIndex((t) => (t.id === album.id && t.title === album.title)));
    // on limite le tableau avec un random de 5 resultats
      result = result.sort(() => Math.random() - Math.random()).slice(0, 5);
      dispatch(setAlbumByGenre(result));
  })
  



} catch (error) {
  console.log(`Erreur lors de la récupération des albums par genre: ${error}`)
}finally{
  dispatch(setLoading(false));
}
}

// methode qui recupere les albums par recherche
export const fetchSearch = (search) => async (dispatch) => {
try {
  dispatch(setLoading(true));
  const responseAlbum = await axios.get(`${API_URL}/albums?page=1&title=${search}&isActive=true`);
  const responseTitle = await axios.get(`${API_URL}/albums?page=1&songs.title=${search}&isActive=true`);
  const responseArtist = await axios.get(`${API_URL}/artists?page=1&name=${search}&isActive=true`);
  dispatch(setSearchAlbum(responseAlbum.data));
  dispatch(setSearchTitle(responseTitle.data));
  dispatch(setSearchArtist(responseArtist.data));
  
} catch (error) {
  console.log(`Erreur lors de la recherche: ${error}`)
}finally{
  dispatch(setLoading(false));
}
}
// methode qui reste la recherche 

export const fetchResetSearch = () => async (dispatch) => {
  dispatch(setSearchAlbum([]));
  dispatch(setSearchTitle([]));
  dispatch(setSearchArtist([]));
}


export default albumSlice.reducer;