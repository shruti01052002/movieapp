import React, { useState } from "react";
import './App.css'; // Import external CSS

const API_KEY = "2c92be9c"; // Replace with your OMDb API key

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState(null);

  const fetchMovies = async () => {
    setSearchedMovie(searchTerm);
    if (!searchTerm) return;
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchMovies} className="search-button">
          Search
        </button>
      </div>
      {selectedMovie ? (
        <div className="movie-details">
          <button onClick={() => setSelectedMovie(null)} className="back-button">
            Back to results
          </button>
          <h2 className="movie-title">{selectedMovie.Title}</h2>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies?.length>0 && searchTerm ? movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">{movie.Year}</p>
            </div>
          )): <div className="no-results">
            {searchedMovie && <p className="no-results-text">No Search Results found</p>}
            </div>}
        </div>
      )}
    </div>
  );
}

export default App;
