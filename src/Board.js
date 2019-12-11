import React, { useReducer, useContext } from 'react';

import './Board.css';

import Square from './Square';

import GlobalContext from './index';

const Board = () => {
    const [state, dispatch] = useReducer(reducer, { dragging: false, dragStartX: null, dragStartY: null, mouseX: null, mouseY: null });
    const context = useContext(GlobalContext);

    return (
        <DragContext.Provider value = {state}>
            <div className = "board" onMouseMove = {(evt) => dispatch({ type: 'mousemove', x: evt.pageX - 450, y: evt.pageY - 100 })}
                onMouseDown = {() => dispatch({ type: 'dragging' })} onMouseUp = {() => dispatch({ type: 'undragging' })} >
                {context.board.map((arr, i) => (
                    <span className = "row" key = {i}>
                        {arr.map((val, j) => <Square dispatch = {dispatch} key = {`${i} ${j}`} x = {j} y = {i} piece = {val} />)}
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
            // console.log('dragging');
            return { ...state, dragging: true, dragStartX: state.mouseX, dragStartY: state.mouseY };
        case ('undragging'):
            // console.log('undragging');
            return { ...state, dragging: false };
        default:
            return state;
    }
};

export const DragContext = React.createContext();