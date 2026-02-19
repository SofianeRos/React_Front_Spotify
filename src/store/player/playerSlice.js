import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSong: {}, // l'objet chanson actuel en cours de lecture
  currentAlbum: [], // infos de l'album en cours de lecture
  currentIndex: 0, // index de la chanson dans son tableau
  currentSongs: [], // tableau de toutes les chansons de la playlist/album
  isActive: false, // le player est il actif ?
  isPlaying: false // la musique est elle en lecture (true) ou en pause (false)
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    /**
     * Active une chanson et initialise le player
     */
    setActiveSong: (state, action) => {
      // stocke la chanson à l'index donné
      state.activeSong = action.payload?.songs[action.payload.index]
      // stocke toutes les chanson de l'album/playlist
      state.currentSongs = action.payload?.songs;
      // Stocke l'index de la chanson active
      state.currentIndex = action.payload?.index;
      // on active le player
      state.isActive = true;
    },

    /**
     * Stocke les informations de l'album en cours
     */
    setActiveAlbum: (state, action) => {
      state.currentAlbum = action.payload?.data
    },

    /**
     * Passe à la chanson suivante dans la playlist
     */
    nextSong: (state, action) => {
      //met a jour la chanson active
      state.activeSong = state.currentSongs[action.payload];

      //met a jour l'index
      state.currentIndex = action.payload;

      // met a jour l'album si la chanson en a un
      // certaine musique peuvent ne pas avoir d'album associé (cas du single)
      state.currentAlbum = state.currentSongs[action.payload]?.album
      ? state.currentSongs[action.payload]?.album
      : state.currentAlbum

      state.isActive = true;
    },

    /**
     * Passe à la chanson precedente dans la playlist
     */
    prevSong: (state, action) => {
      //met a jour la chanson active
      state.activeSong = state.currentSongs[action.payload];

      //met a jour l'index
      state.currentIndex = action.payload;

      // met a jour l'album si la chanson en a un
      // certaine musique peuvent ne pas avoir d'album associé (cas du single)
      state.currentAlbum = state.currentSongs[action.payload]?.album
      ? state.currentSongs[action.payload]?.album
      : state.currentAlbum

      state.isActive = true;
    },

    /**
     * bascule entre play et pause
     */
    playPause: (state, action) => {
      state.isPlaying = action.payload
    }
  }

})

export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause} = playerSlice.actions;

export default playerSlice.reducer;