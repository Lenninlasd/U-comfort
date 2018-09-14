import React from 'react';

export default ({ onClick }) => {
    return (
        <button type="button"
            className="btn btn-outline-dark btn-sm list-back-button"
            onClick={onClick}>
            <strong>&#8592;</strong>
        </button>
    )
}
