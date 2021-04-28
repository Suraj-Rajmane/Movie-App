import React from 'react';


const MovieList = ({movies, FavouriteComponent, handleFavouritesClick}) => {


    if(!movies) {
        return null;
    }


    return (
        <>
            {movies.map((movie) => 
            <div className="d-flex justify-content-start m-3 image-container" key={movie.imdbID}>
                <img src={movie.Poster} alt="movie"/>
                <div className="overlay d-flex justify-content-center align-items-center" onClick={() => handleFavouritesClick(movie)}>
                    <FavouriteComponent/>
                </div>
            </div>
            )}
        </>
    );
};

export default MovieList;