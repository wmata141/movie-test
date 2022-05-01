import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const NotFound = () => (
  <div>
    <div className="col-12 text-center m-8">
      <h1>Lo sentimos. </h1>
      <p>No encontramos esta página.</p>
      <Link to="/">Aquí puedes volver al Inicio.</Link>
    </div>
    <Footer />
  </div>
);

export default NotFound;