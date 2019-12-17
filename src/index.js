import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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
            board[action.move.y][action.move.x] = action.move.piece;
            return { ...state, board }
        default:
            return state;
    }
};

const Context = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        board: [],
        postMove: (move) => {
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