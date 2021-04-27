import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3877b0d8`;

    const response = await fetch(url);

    const responseJson = await response.json();

    // console.log(responseJson)

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }

  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    
    setFavourites(movieFavourites);

  }, [])

  useEffect(() => {

    getMovieRequest(searchValue);

  }, [searchValue]);

  return (
    <div className="container-fluid movie-app" >

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>

      <div className="row">
      <MovieList movies={movies} FavouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie}/>
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites"/>
      </div>

      <div className="row">
      <MovieList movies={favourites} FavouriteComponent={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie}/>
      </div>
      
    </div>
  );
}

export default App;
