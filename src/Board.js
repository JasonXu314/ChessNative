import React, { useContext } from 'react';

import './Board.css';

import Square from './Square';

import GlobalContext from './index';

const Board = () => {
    const context = useContext(GlobalContext);

    return (
        <>
            {context.board.map((arr, i) => <span className = "row" key = {i}>{arr.map((val, j) => <Square key = {`${i} ${j}`} x = {j} y = {i} piece = {val} />)}</span>)}
        </>
    );
};

export default Board;