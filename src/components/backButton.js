import React from 'react';

const BackButton = ({ onClick }) => {
    return (
        <button type='button'
            className='btn btn-outline-dark btn-sm list-back-button'
            onClick={onClick}>
            <strong>&#8592;</strong>
        </button>
    );
};

export default BackButton;