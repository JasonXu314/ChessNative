import React from 'react';

import './Board.css';

import Square from './Square';

const Board = (props) => {
    return (
        <table className = "board" cellSpacing = "0">
            <tbody>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
                <tr>
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </tr>
            </tbody>
        </table>
    );
};

export default Board;