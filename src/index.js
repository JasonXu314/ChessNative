import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const GlobalContext = React.createContext();
export default GlobalContext;

const reducer = (state, action) => {
    switch (action.type)
    {
        case ('init'):
            const board = new Array(8);
            board.fill(new Array(8));
            return { ...state, board };
        case ('move'):
            return {};
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
        console.log(state.board);
    }, []);

    return (
        <GlobalContext.Provider value = {state}>
            {props.children}
        </GlobalContext.Provider>
    );
};

ReactDOM.render(<Context><App /></Context>, document.getElementById('root'));