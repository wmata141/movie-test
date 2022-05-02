import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';

const Favorite = () => {
  const [loading] = useState(false);
  const [error] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movies = localStorage.getItem("save-movies");
    if (movies) {
      setMovies(JSON.parse(movies));
    }
  }, [])

  return (
    <div className="col-12 anchor" id="favs">
      <h1>Mis favoritas</h1>
      <div className="row">
        {!loading && movies.map(movie =>
          <MovieCard movie={movie} key={movie.id} />
        )}
        {loading &&
          <div className="col-12 text-center">
            <p>Cargando información...</p>
          </div>
        }
        {!loading && !error && !movies.length &&
          <div className="col-12 text-center">
            <h3>Aún no has agregado películas favoritas.</h3>
          </div>
        }
        {!loading && error &&
          <div className="col-12 text-center">
            <h2>Ocurrió un error.</h2>
          </div>
        }
      </div>
    </div>
  );
}

export default Favorite;