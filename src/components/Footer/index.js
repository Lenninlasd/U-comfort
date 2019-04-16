import React from 'react';
import uaImg from '../../../img/ua.png';

export const Footer = () => (
  <footer className="row">
    <div className="col-xs-1">
      <div>
        <img src={uaImg} alt="Uniatlantico logo" width="70" />
      </div>
    </div>
    <div className="col-xs-11">
      <div>Ingeniería mecánica</div>
      <div>Tesistas: Maria Jose Herrera de la Peña, Alan Sandoval Joleanis.</div>
      <div>Directores: Javier Roldan - Giovanni Barletta.</div>
      <div>Año 2019</div>
    </div>
  </footer>
);
