import React from 'react';

import './Piece.css';

import Kw from './resources/Kw.png';
import Kb from './resources/Kb.png';
import Qw from './resources/Qw.png';
import Qb from './resources/Qb.png';
import Rw from './resources/Rw.png';
import Rb from './resources/Rb.png';
import Bw from './resources/Bw.png';
import Bb from './resources/Bb.png';
import Nw from './resources/Nw.png';
import Nb from './resources/Nb.png';
import pw from './resources/pw.png';
import pb from './resources/pb.png';

const Piece = (props) => {
    if (props.piece === '')
    {
        return null;
    }
    else
    {
        return (
            <img className = "piece" alt = "Error" src = {pieceDict[props.piece]} onMouseUp = {() => {}} draggable = {false}
                style = {props.position ? { position: 'fixed', left: props.position.x - 30, top: props.position.y - 30, zIndex: 11 } : null} />
        );
    }
};

export default Piece;

const pieceDict = {
    Kw: Kw,
    Kb: Kb,
    Qw: Qw,
    Qb: Qb,
    Rw: Rw,
    Rb: Rb,
    Bw: Bw,
    Bb: Bb,
    Nw: Nw,
    Nb: Nb,
    pw: pw,
    pb: pb
}