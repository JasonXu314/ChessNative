import React, { useReducer, useContext } from 'react';

import './Board.css';

import Square from './Square';

import GlobalContext from './index';

const Board = () => {
    const context = useContext(GlobalContext);

    const reducer = (state, action) => {
        switch (action.type)
        {
            case ('mousemove'):
                // console.log({ x: Math.floor((action.x - 4)/64), y: Math.floor((action.y - 4)/64) });
                return { ...state, mouseX: action.x, mouseY: action.y, hoverSquare: { x: Math.floor((action.x - 4)/64), y: Math.floor((action.y - 4)/64) } };
            case ('dragging'):
                // console.log(Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64));
                // console.log(state.mouseX, state.mouseY);
                return {
                    ...state,
                    dragging: true,
                    dragStartX: state.mouseX,
                    dragStartY: state.mouseY,
                    originSquare: { x: Math.floor((state.mouseX - 4)/64), y: Math.floor((state.mouseY - 4)/64) }
                };
            case ('undragging'):
                // console.log(Math.floor((state.mouseX - 4)/64), Math.floor((state.mouseY - 4)/64));
                // console.log('undragging');
                return {
                    ...state,
                    dragging: false,
                    endingSquare: { x: Math.floor((state.mouseX - 4)/64), y: Math.floor((state.mouseY - 4)/64) }
                };
            case ('selected'):
                return {
                    ...state,
                    selectedSquare: { x: action.x, y: action.y }
                };
            case ('unselected'):
                return {
                    ...state,
                    selectedSquare: { x: null, y: null }
                };
            case ('move'):
                context.postMove({
                    startX: action.startX,
                    startY: action.startY,
                    endX: state.hoverSquare.x,
                    endY: state.hoverSquare.y,
                    piece: action.piece
                });
                return {
                    ...state,
                    selectedSquare: { x: null, y: null }
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        dragging: false,
        dragStartX: null,
        dragStartY: null,
        mouseX: null,
        mouseY: null,
        hoverSquare: { x: null, y: null },
        originSquare: { x: null, y: null},
        selectedSquare: { x: null, y: null }
    });

    return (
        <DragContext.Provider value = {state}>
            <div className = "board" onMouseMove = {(evt) => dispatch({ type: 'mousemove', x: evt.pageX, y: evt.pageY })}
                onMouseDown = {() => dispatch({ type: 'dragging' })} onMouseUp = {() => dispatch({ type: 'undragging' })} >
                {context.board.map((arr, i) => (
                    <span className = "row" key = {i}>
                        {arr.map((val, j) => <Square dispatch = {dispatch} key = {`${i} ${j}`} x = {j} y = {i} piece = {val}
                                                color = {i % 2 === 0 ? j % 2 === 0 ? 'white' : 'black' : j % 2 === 0 ? 'black' : 'white'} />)}
                    </span>
                ))}
            </div>
        </DragContext.Provider>
    );
};

export default Board;

export const DragContext = React.createContext();