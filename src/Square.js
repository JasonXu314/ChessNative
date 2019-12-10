import React, { useReducer } from 'react';
import Piece from './Piece';

import './Square.css';

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

    if (props.piece === '')
    {
        return (
            <div className = "square" style = {{ top: parseInt(props.y) * 68, left: parseInt(props.x) * 68 }} />
        );
    }
    else
    {
        return (
            <div className = "square" style = {{ top: parseInt(props.y) * 68, left: parseInt(props.x) * 68, backgroundColor: state.clicked ? '#408f32' : null }}
                onMouseDown = {() => dispatch({ type: 'dragging' })} onClick = {() => dispatch({ type: 'click' })} >
                <Piece piece = {props.piece} position = {state.dragging ? { x:  } : null} />
            </div>
        );
    }
};

export default Square;