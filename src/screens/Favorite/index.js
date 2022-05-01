import React from 'react';
import FavoriteComponent from '../../components/Favorite';
import Footer from '../../components/Footer';
import './styles.css';

const Favorite = () => {
  return (
    <div className='Home'>
      <div className='container-flex'>
        <FavoriteComponent />
      </div>
      <Footer />
    </div>
  );
}

export default Favorite;

