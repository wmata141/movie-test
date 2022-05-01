import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import Footer from '../../components/Footer';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [premieres, setPremieres] = useState([]);
  const [premieresAux, setPremieresAux] = useState([]);

  useEffect(() => {    
    fetchPremiere()
  }, [])

  const fetchPremiere = async () => {
    const favsMovies = localStorage.getItem("favs-movies");
    const movies = localStorage.getItem("movies");
    if (movies) {
      setPremieres(JSON.parse(movies))
    } else {
      try {
        setLoading(true)
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&primary_release_year=2019';
        const data = await fetch(url)
        const { results } = await data.json()
        
        if (favsMovies) {
          const moviesJson = JSON.parse(favsMovies)          
          const newArray = results.map(item => moviesJson.find(itemMovie => itemMovie.id === item.id) || item);
          setPremieres(newArray)
          localStorage.setItem("movies", JSON.stringify(newArray))
        } else {
          setPremieres(results)
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
    setPremieres([])
    setLoading(true)
    setTimeout(() => {
      const newArray = premieres.sort((a, b) => { return (Math.random() - 0.5) });
      setPremieres(newArray)
      localStorage.setItem("movies", JSON.stringify(newArray))      
      setLoading(false)      
    }, 500);
  }

  const changePunctuation = () => {
    setPremieres([])
    setLoading(true)
    setTimeout(() => {
      const auxPremiere = []
      premieres.forEach(element => {
        if (Math.random() > 0.5) {
          const average = Math.random() * 10
          element.vote_average = average.toFixed();
          auxPremiere.push(element)
        }
      });
      setPremieres(premieres)
      setLoading(false)
      if (auxPremiere.length > 0) {
        setPremieresAux(auxPremiere)
      }
    }, 500);
  }

  const duplicate = (movie) => {
    const auxPremiere = premieres
    setPremieres([])
    setLoading(true)
    setTimeout(() => {
      movie.id = uuidv4()
      auxPremiere.push(movie)
      setPremieres(auxPremiere)
      setPremieresAux([...premieresAux, movie])
      setLoading(false)
    }, 500);
  }

  const guardar = () => {
    localStorage.setItem("favs-movies", JSON.stringify(premieresAux));
    alert('Peliculas guardadas')
  }

  const changeAuthor = (movie) => {
    const favsMovies = localStorage.getItem("favs-movies");
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
      setPremieresAux(favsMoviesJson)
    } else {      
      setPremieresAux([movie])
    }

    moviesJson.forEach(element => {
      if (element.id === movie.id) {
        element.author = movie.author
      }
    });
    localStorage.setItem("movies", JSON.stringify(moviesJson));
    setPremieres(moviesJson)
  }

  return (
    <div className='Home'>
      <div className='container-flex'>
        <div className='col-12 anchor' id='premieres'>

          <button onClick={() => desorder()} type="button" className="btn btn-link">Desordenar</button>
          <button onClick={() => changePunctuation()} type="button" className="btn btn-link">Cambiar Puntuacion</button>
          <button onClick={() => guardar()} type="button" className="btn btn-link">Guardar</button>

          <div className='row'>
            <div className='col-12 text-left'>
            </div>
            {!loading && premieres.map(movie => <MovieCard movie={movie} key={movie.id} duplicate={duplicate} changeAuthor={changeAuthor} />)}
            {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div>}
            {!loading && !error && !premieres.length && <div className='col-12 text-center'> <h2>No hay información disponible.</h2></div>}
            {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2></div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
