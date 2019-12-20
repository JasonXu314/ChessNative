import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import check from './moveChecker';

const GlobalContext = React.createContext();
export default GlobalContext;

const reducer = (state, action) => {
    let board;
    switch (action.type)
    {
        case ('init'):
            board = [['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
                        ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
                        ['', '', '', '', '', '', '', '', ],
                        ['', '', '', '', '', '', '', '', ],
                        ['', '', '', '', '', '', '', '', ],
                        ['', '', '', '', '', '', '', '', ],
                        ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
                        ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw']];
            return { ...state, board };
        case ('move'):
            board = state.board;
            if (state.colorMove === action.move.piece.slice(1) && check(action.move, board))
            {
                board[action.move.endY][action.move.endX] = action.move.piece;
                board[action.move.startY][action.move.startX] = '';
                return { ...state, colorMove: state.colorMove === 'w' ? 'b' : 'w', board };
            }
            return state;
        default:
            return state;
    }
};

const Context = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        board: [],
        colorMove: 'w',
        postMove: (move) => {
            // console.log(state.board);
            dispatch({ type: 'move', move });
        }
    });

    useEffect(() => {
        dispatch({ type: 'init' });
    }, []);

    return (
        <GlobalContext.Provider value = {state}>
            {props.children}
        </GlobalContext.Provider>
    );
};

ReactDOM.render(<Context><App /></Context>, document.getElementById('root'));