import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CanvasElement from './roomCanvasElement';
import CardForm from './cardForm.js';
import EquipmentsView from './Equipments.js';

const MainView = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-8 col-lg-7 col-md-5">
        <CanvasElement id="cubeContainer" />
      </div>
      <div className="col-xl-4 col-lg-5 col-md-7">
        <CardForm />
      </div>
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
