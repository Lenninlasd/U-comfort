import React from 'react';
import PropTypes from 'prop-types';

const BackButton = ({ onClick }) => {
    return (
        <button type='button'
            className='btn btn-outline-dark btn-sm list-back-button'
            onClick={onClick}>
            <strong>&#8592;</strong>
        </button>
    );
};
BackButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default BackButton;