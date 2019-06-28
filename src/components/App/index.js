/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CanvasElement from '../RoomCanvas';
import CardForm from '../CardForm';
import EquipmentsView from '../Equipments';

import boot from 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Styles/css.css';
import grid from '../Styles/grid.css';
import navbar from './navbar.css';

const MainView = () => (
  <div className={`${grid.uContainer} ${styles.Playground}`}>
    <nav className={`${navbar.uNavbar} ${boot.navbar}`}>
      <span className={`${boot.navbarBrand} ${boot.mb0} ${boot.h1}`}>U-Confort</span>
    </nav>
    <div className={grid.canvasElement}>
      <CanvasElement id="cubeContainer" />
    </div>
    <div className={grid.cardForm}>
      <CardForm />
    </div>
  </div>
);

export const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainView} />
      <Route path="/equipment" component={EquipmentsView} />
    </div>
  </Router>
);
