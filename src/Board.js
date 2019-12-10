import React, { useReducer, useContext } from 'react';

import './Board.css';

import Square from './Square';

import GlobalContext from './index';

const Board = () => {
    const [state, dispatch] = useReducer(reducer, { dragStartX: null, dragStartY: null, mouseX: null, mouseY: null });
    const context = useContext(GlobalContext);

    return (
        <DragContext.Provider value = {state}>
            <div className = "board" onMouseMove = {(evt) => dispatch({ type: 'mousemove', x: evt.clientX, y: evt.clientY })} >
                {context.board.map((arr, i) => <span className = "row" key = {i}>{arr.map((val, j) => <Square dispatch = {dispatch} key = {`${i} ${j}`} x = {j} y = {i} piece = {val} />)}</span>)}
            </div>
        </DragContext.Provider>
    );
};

export default Board;

const reducer = (state, action) => {
    switch (action.type)
    {
        case ('mousemove'):
            return { ...state, x: action.x, y: action.y };
        default:
            return state;
    }
};

export const DragContext = React.createContext();