import React from 'react';
import { connect } from 'react-redux';
import BackButton from './backButton.js';

const ConfigWalls = ({paredes, handleBackButton}) => {
    return (
        <div>
            <div>
                <BackButton onClick={handleBackButton}/>
            </div>
            <div>hello</div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
  handleBackButton: () => dispatch({
      type: 'HIDE_WINDOWS_PROPS'
  })
});

const mapStateToProps = state => ({
    paredes: state.paredes
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigWalls);