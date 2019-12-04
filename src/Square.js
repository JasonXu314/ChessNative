import React, { useReducer } from 'react';

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
}

const Square = (props) => {
    const [state, dispatch] = useReducer(reducer, { clicked: false, dragging: false, x: null, y: null });

    return (
        <div className = "square" style = {{ top: parseInt(props.y) * 75, left: parseInt(props.x) * 75 }} onClick = {() => console.log(props.piece)}>{props.piece}</div>
    );
};

export default Square;