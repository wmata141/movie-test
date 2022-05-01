import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [favs, setFavs] = useState([]);
  const [movie, setMovie] = useState([]);

  const location = useLocation();
  const arr = location.pathname.split('/');  
  const movie_id = arr[2]  

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDetail = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=756e1622851086c3d011b8461693b962&language=es-ES`;
      setLoading(true)
      setError(false)
      const response = await fetch(url);
      const responseJson = await response.json();
      setMovie(responseJson)
      setLoading(false)
      setError(false)
    } catch (e) {      
      setLoading(false)
      setError(true)
    }
  };
  
  // const saveFavs = (movie) => {
  //   const favorite = {
  //     id: movie.id,
  //     title: movie.title,
  //     poster_path: movie.poster_path,
  //     overview: movie.overview,
  //     tagline: movie.tagline,
  //     vote_average: movie.vote_average
  //   }
  //   let allMovies = JSON.parse(localStorage.getItem('favs-movies')) || [];
  //   let repeated = allMovies.filter((movie) => { return movie.id === favorite.id }).length;
  //   if (!repeated) {
  //     setFavs(favs);
  //     allMovies.push(favorite);
  //     localStorage.setItem("favs-movies", JSON.stringify(allMovies));
  //     alert('Agregado a favoritos :)')
  //   } else { alert('Esta película ya está en tus favoritos :)') };
  // }

  return (
    <div>      
      {!loading && !error && movie.id &&
        <div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 float-left p-2 my-2 text-center">
            <img className="poster" alt="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-lg-9 col-xl-9 float-left p-8 my-4 text-left">
            <h2> {movie.title}</h2>
            <p>{movie.tagline}</p>
            <p>Nota: {movie.vote_average}</p>
            <p>Resumen: {movie.overview}</p>
            {/* <button onClick={() => saveFavs(movie)}>Agregar a favoritos</button> */}
          </div>
        </div>
      }
      {loading &&
        <div className="col-12 text-center">
          <p>Cargando información...</p>
        </div>
      }
      {!loading && !error && !movie.id &&
        <div className="col-12 text-center">
          <h2>No hay información disponible.</h2>
        </div>
      }
      {!loading && error &&
        <div className="col-12 text-center">
          <h2>Ocurrió un error.</h2>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Detail;