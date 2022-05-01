import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const authors = [
    'Tom', 'Michael', 'Marlon', 'Andy',
]

const MovieCard = memo(({ movie, duplicate, changeAuthor }) => {
    
    const changeSelect = (value) => {        
        movie.author = value
        changeAuthor(movie)
    }

    return (
        <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 float-left text-center movierow" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
                <img className="img-thumbnail thumb" alt="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                <h6 style={{ marginBottom: 0 }}> {movie.title}</h6>
                <p style={{ marginBottom: 0 }}>Nota: {movie.vote_average}</p>
            </Link>
            <div>
                <select name="select" onChange={(e) => changeSelect(e.target.value) }>
                    <option value={movie.author} defaultValue={'selected'}>{movie.author}</option>
                    {authors.map(a => {
                        return (
                            <option key={a} value={a}>{a}</option>
                        )
                    })}
                </select>
            </div>

            <button style={{ padding: 0 }} onClick={() => duplicate(movie)} type="button" className="btn btn-link">clonar</button>
        </div>
    )
})

export default MovieCard;