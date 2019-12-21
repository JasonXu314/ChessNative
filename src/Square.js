import React, { useReducer, useContext } from 'react';
import Piece from './Piece';

import './Square.css';

import { DragContext } from './Board';

const reducer = (state, action) => {
    switch (action.type)
    {
        case ('dragging'):
            // console.log('dragging');
            return { ...state, dragging: true };
        case ('undragging'):
            // console.log('undragging');
            return { ...state, dragging: false };
        case ('click'):
            return { ...state, clicked: !state.clicked };
        default:
            return state;
    }
};

/**
 * Square on the chess board
 * @param {{ x: number, y: number, piece: string, color: string, dispatch: React.Dispatch<A> }} props the props
 */
const Square = (props) => {
    const [state, dispatch] = useReducer(reducer, {
            clicked: false,
            dragging: false,
            x: null,
            y: null,
            piece: props.piece.slice(0, 1),
            color: props.piece.slice(1, 2)
        });
    const context = useContext(DragContext);

    if (props.piece === '')
    {
        return (
            <div className = "square" style = {{
                top: parseInt(props.y) * 64,
                left: parseInt(props.x) * 64,
                backgroundColor: props.color === 'white' ? 'burlywood' : 'peru'
            }} onClick = {() => props.dispatch({ type: 'selected', x: props.x, y: props.y })} />
        );
    }
    else
    {
        return (
            <div className = "square" style = {{
                    top: parseInt(props.y) * 64,
                    left: parseInt(props.x) * 64,
                    backgroundColor: context.selectedSquare.x === props.x && context.selectedSquare.y === props.y
                        ? 'rgba(64, 143, 50, 0.6)' : props.color === 'white' ? 'burlywood' : 'peru',
                }} onMouseDown = {() => dispatch({ type: 'dragging' })} onMouseUp = {() => {
                    dispatch({ type: 'undragging' });
                    if (context.hoverSquare.x === props.x && context.hoverSquare.y === props.y)
                    {
                        props.dispatch({
                            type: context.selectedSquare.x === props.x && context.selectedSquare.y === props.y ? 'unselected' : 'selected',
                            x: props.x,
                            y: props.y
                        });
                    }
                    else
                    {
                        props.dispatch({
                            type: 'move',
                            startX: props.x,
                            startY: props.y,
                            piece: props.piece
                        });
                    }
                }} >
                <Piece piece = {props.piece} position = {state.dragging ? { x: context.mouseX, y: context.mouseY } : null} />
            </div>
        );
    }
};

export default Square;