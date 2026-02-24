import React, { useEffect } from "react";
import SearchBar from "../../components/Services/SearchBar";
import { useDispatch } from "react-redux";
import { fetchResetSearch } from "../../store/album/albumSlice";

const Search = () => {

  // on recupere le hook pour dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResetSearch());
  }, [dispatch])
  


  return <SearchBar />;
};

export default Search;
