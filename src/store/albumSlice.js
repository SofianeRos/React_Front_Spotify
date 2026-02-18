import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name : "albums",
    initialState : {
        loading : false,
        albums : [],
    },
    reducers : {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAlbums: (state, action) => {
            state.albums = action.payload;
        }
    }
})

export const { setLoading, setAlbums } = albumSlice.actions;
export default albumSlice.reducer;