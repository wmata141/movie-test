import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-expand-xl navbar-dark bg-danger fixed-top'>
      <div className='container'>
        <a className='navbar-brand' href="javascript:void(0)">React Movies</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to={`/`}>
                <i className='fas fa-ticket-alt'></i> Estrenos
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={`/favorite`}>
                <i className='fas fa-star'></i> Modificadas
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;