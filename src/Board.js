import React, { useReducer, useContext } from 'react';

import './Board.css';

import Square from './Square';

import GlobalContext from './index';

const Board = () => {
    const [state, dispatch] = useReducer(reducer,
        {
            dragging: false,
            dragStartX: null,
            dragStartY: null,
            mouseX: null,
            mouseY: null,
            originSquare: [null, null],
            selectedSquare: [null, null]
        });
    const context = useContext(GlobalContext);

    return (
        <DragContext.Provider value = {state}>
            <div className = "board" onMouseMove = {(evt) => dispatch({ type: 'mousemove', x: evt.pageX, y: evt.pageY })}
                onMouseDown = {() => dispatch({ type: 'dragging' })} onMouseUp = {() => dispatch({ type: 'undragging' })} >
                {context.board.map((arr, i) => (
                    <span className = "row" key = {i}>
                        {arr.map((val, j) => <Square dispatch = {dispatch} key = {`${i} ${j}`} x = {j} y = {i} piece = {val} color = {i % 2 === 0 ? j % 2 === 0 ? 'white' : 'black' : j % 2 === 0 ? 'black' : 'white'} />)}
                    </span>
                ))}
            </div>
        </DragContext.Provider>
    );
};

export default Board;

const reducer = (state, action) => {
    switch (action.type)
    {
        case ('mousemove'):
            // console.log(action.x, action.y);
            return { ...state, mouseX: action.x, mouseY: action.y };
        case ('dragging'):
            // console.log(Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64));
            // console.log(state.mouseX, state.mouseY);
            return {
                ...state,
                dragging: true,
                dragStartX: state.mouseX,
                dragStartY: state.mouseY,
                originSquare: [Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64)]
            };
        case ('undragging'):
            // console.log(Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64));
            // console.log('undragging');
            return {
                ...state,
                dragging: false,
                endingSquare: [Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64)]
            };
        case ('selected'):
            return {
                ...state,
                selectedSquare: [action.x, action.y]
            };
        case ('unselected'):
            return {
                ...state,
                selectedSquare: [null, null]
            };
        default:
            return state;
    }
};

export const DragContext = React.createContext();