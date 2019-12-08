import React, { useReducer, useContext } from 'react';
import Piece from './Piece';

import './Square.css';

import GlobalContext from './index';

const reducer = (state, action) => {
    switch (action.type)
    {
        case ('dragging'):
            return { ...state, dragging: true };
        case ('undragging'):
            return { ...state, dragging: false };
        case ('click'):
            return { ...state, clicked: !state.clicked };
        default:
            return state;
    }
};

const Square = (props) => {
    const [state, dispatch] = useReducer(reducer, { clicked: false, dragging: false, x: null, y: null, piece: props.piece.slice(0, 1), color: props.piece.slice(1, 2) });
    const context = useContext(GlobalContext);

    return (
        <div className = "square" style = {{ top: parseInt(props.y) * 75, left: parseInt(props.x) * 75, backgroundColor: state.clicked ? 'green' : null }}
            onClick = {() => console.log(state.piece, state.color) & dispatch({ type: 'click' })} >
            <Piece piece = {context.board[props.y][props.x]} />
        </div>
    );
};

export default Square;