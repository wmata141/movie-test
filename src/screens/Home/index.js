import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import Footer from '../../components/Footer';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesAux, setMoviesAux] = useState([]);

  useEffect(() => {
    fetchPremiere()
  }, [])

  const fetchPremiere = async () => {
    const favsMovies = localStorage.getItem("save-movies");
    const moviesStorage = localStorage.getItem("movies");
    if (moviesStorage) {
      setMovies(JSON.parse(moviesStorage))
    } else {
      try {
        setLoading(true)
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&primary_release_year=2019';
        const data = await fetch(url)
        const { results } = await data.json()

        if (favsMovies) {
          const moviesJson = JSON.parse(favsMovies)
          const newArray = results.map(item => moviesJson.find(itemMovie => itemMovie.id === item.id) || item);
          setMovies(newArray)
          localStorage.setItem("movies", JSON.stringify(newArray))
        } else {
          setMovies(results)
          localStorage.setItem("movies", JSON.stringify(results))
        }
        setLoading(false)
        setError(false)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
  }

  const desorder = () => {
    setMovies([])
    setLoading(true)
    setTimeout(() => {
      const newArray = movies.sort((a, b) => { return (Math.random() - 0.5) });
      setMovies(newArray)
      localStorage.setItem("movies", JSON.stringify(newArray))
      setLoading(false)
    }, 500);
  }

  const changePunctuation = () => {
    setMovies([])
    setLoading(true)
    setTimeout(() => {
      const auxPremiere = []
      movies.forEach(element => {
        if (Math.random() > 0.5) {
          const average = Math.random() * 10
          element.vote_average = average.toFixed();
          auxPremiere.push(element)
        }
      });
      setMovies(movies)
      setLoading(false)
      if (auxPremiere.length > 0) {
        setMoviesAux(auxPremiere)
      }
    }, 500);
  }

  console.log("movies ==>", movies);
  console.log("moviesAux ==>", moviesAux);
  const duplicate = (movie) => {   
    let movieAux = { ...movie }    
    movieAux.id = uuidv4()

    setMovies([...movies, movieAux])
    setMoviesAux([...moviesAux, movieAux])
  }

  const guardar = () => {
    localStorage.setItem("save-movies", JSON.stringify(moviesAux));
    const newArray = movies.map(item => moviesAux.find(itemMovie => itemMovie.id === item.id) || item);
    localStorage.setItem("movies", JSON.stringify(newArray));
    alert('Peliculas guardadas')
  }

  const changeAuthor = (movie) => {
    const favsMovies = localStorage.getItem("save-movies");
    const favsMoviesJson = JSON.parse(favsMovies)
    const movies = localStorage.getItem("movies");
    const moviesJson = JSON.parse(movies)

    let include = false
    if (favsMovies) {
      favsMoviesJson.forEach(element => {
        if (element.id === movie.id) {
          element.author = movie.author
          include = true
        }
      });
      if (!include) {
        favsMoviesJson.push(movie)
      }
      setMoviesAux(favsMoviesJson)
    } else {
      setMoviesAux([movie])
    }

    moviesJson.forEach(element => {
      if (element.id === movie.id) {
        element.author = movie.author
      }
    });
    localStorage.setItem("movies", JSON.stringify(moviesJson));
    setMovies(moviesJson)
  }

  return (
    <div className='Home'>
      <div className='container-flex'>
        <div className='col-12 anchor' id='movies'>

          <button onClick={() => desorder()} type="button" className="btn btn-link">Desordenar</button>
          <button onClick={() => changePunctuation()} type="button" className="btn btn-link">Cambiar Puntuacion</button>
          <button onClick={() => guardar()} type="button" className="btn btn-link">Guardar</button>

          <div className='row'>
            <div className='col-12 text-left'>
            </div>
            {!loading && movies.map(movie => <MovieCard movie={movie} key={movie.id} duplicate={duplicate} changeAuthor={changeAuthor} />)}
            {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div>}
            {!loading && !error && !movies.length && <div className='col-12 text-center'> <h2>No hay información disponible.</h2></div>}
            {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2></div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
