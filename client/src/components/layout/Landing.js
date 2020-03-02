import React, { Component } from 'react'
import { Link } from 'react-router-dom';

 class Landing extends Component {
    render() {
        return (
      <div className="landing">
    <div className="dark-overlay landing-inner text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Partage des Connaissances 
            </h1>
            <p className="lead"> MobTech est une plateforme de blogging qui permet à tous les membres de l’équipe Mobelite de partager et d’enrichir leurs connaissances techniques et de la veille technologique.</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
        )
    }
}
export default Landing;