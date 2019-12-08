import React from 'react';

const Piece = (props) => {
    return (
        <img alt = "Error" src = {`../resources/${props.piece}.jpg`} />
    );
};

export default Piece;