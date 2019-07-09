import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { initCube, updateLights, updateGeometry } from './createCubeElement';
import compassImg from '../../../img/compass.svg';

import styles from '../Styles/css.css';

const CompassElement = ({ angle }) => {
  return (
    <div className={styles.compass} style={{ transform: `rotate(${angle}deg)` }}>
      <img height="60" width="60" src={compassImg} />
    </div>
  );
};
CompassElement.propTypes = {
  angle: PropTypes.number.isRequired
};

function CanvasElement({ id, size, numberOfLights }) {
  const [angle, setAngle] = useState(0);
  const [meshes, setMeshes] = useState({});

  useEffect(() => setMeshes(initCube(id, size, numberOfLights)), []);

  useEffect(() => {
    if (!meshes.controls) return;
    meshes.controls.addEventListener('change', changeOrbit);
  }, [meshes]);

  useEffect(() => {
    if (!meshes.meshFloor) return;
    updateGeometry(meshes, size);
    updateLights(meshes, size, numberOfLights);
  }, [size, numberOfLights]);

  function changeOrbit({ target }) {
    const angle = (target.object.rotation.z * 180) / Math.PI;
    setAngle(angle);
  }

  return (
    <div id={id} className={styles.threedmodel}>
      <CompassElement angle={angle} />
    </div>
  );
}
CanvasElement.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired
  }).isRequired,
  numberOfLights: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  size: {
    width: state.width,
    height: state.height,
    depth: state.depth
  },
  numberOfLights: state.lights.numberOfLights
});

export default connect(mapStateToProps)(CanvasElement);
