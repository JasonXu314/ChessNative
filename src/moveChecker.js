/**
 * Checks if a move is valid
 * @param {{
 *      startX: number,
 *      startY: number,
 *      endX: number,
 *      endY: number,
 *      piece: string
 *  }} move the move attempting to be played
 * @param {string[][]} board the current board state
 */
const check = (move, board) => {
    const color = move.piece.slice(1);
    const newBoard = Array.from(board, (arr) => [...arr]);
    newBoard[move.endY][move.endX] = move.piece;
    newBoard[move.startY][move.startX] = '';
    const control = generateControl(newBoard, color === 'w' ? 'b' : 'w');
    const king = { x: null, y: null };

    board.forEach((row, i) => {
        row.forEach((val, j) => {
            if (val.slice(1) === color && val.slice(0, 1) === 'K')
            {
                king.x = j;
                king.y = i;
            }
        });
    });
    if (king.x === null || king.y === null) { throw new Error('null King!'); }

    return !control[king.y][king.x] && canHypoMove(move.piece, board, {
        startX: move.startX,
        startY: move.startY,
        endX: move.endX,
        endY: move.endY
    });
};

export default check;

/**
 * Generates the "control" of a color; squares being controlled cannot be moved to by the king
 * @param {string[][]} board the current state of the board
 * @param {string} color the color whose control is being generated
 */
function generateControl(board, color)
{
    const controlBoard = [[false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false],
                            [false, false, false, false, false, false, false, false]];
    const pieces = [];

    board.forEach((row, i) => {
        row.forEach((val, j) => {
            if (val.slice(1) === color)
            {
                pieces.push({ piece: val, x: j, y: i });
            }
        });
    });
    // console.log(controlBoard);

    board.forEach((row, i) => {
        row.forEach((v, j) => {
            if (controlBoard[i][j])
            {
                return;
            }
            for (let val of pieces)
            {
                if (canHypoMove(val.piece, board, { startX: val.x, startY: val.y, endX: j, endY: i }))
                {
                    controlBoard[i][j] = true;
                    break;
                }
            }
        });
    });

    return controlBoard;
}

/**
 * Checks whether a piece can *hypothetically* move to a spot
 * @param {string} piece the piece being moved
 * @param {string[][]} board the current board state
 * @param {{ startX: number, startY: number, endX: number, endY: number }} move the move hypothetically being played
 */
function canHypoMove(piece, board, move)
{
    switch (piece.slice(0, 1))
    {
        case ('R'):
            if (move.startX === move.endX &&
                    (board[move.endY][move.endX] === '' || board[move.endY][move.endX].slice(1) !== piece.slice(1)))
            {
                const j = move.startX;
                if (move.startY < move.endY)
                {
                    for (let i = move.startY + 1; i < move.endY; i++)
                    {
                        if (board[i][j] !== '')
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    for (let i = move.startY - 1; i > move.endY; i--)
                    {
                        if (board[i][j] !== '')
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            else if (move.startY === move.endY &&
                    (board[move.endY][move.endX] === '' || board[move.endY][move.endX].slice(1) !== piece.slice(1)))
            {
                const i = move.startY;
                if (move.startX < move.endX)
                {
                    for (let j = move.startX + 1; j < move.endX; j++)
                    {
                        if (board[i][j] !== '')
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    for (let j = move.startX - 1; j > move.endX; j--)
                    {
                        if (board[i][j] !== '')
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        case ('B'):
            if (Math.abs(move.startX - move.endX) !== Math.abs(move.startY - move.endY) ||
                    (board[move.endY][move.endX] !== '' && board[move.endY][move.endX].slice(1) === piece.slice(1)))
            {
                return false;
            }
            if (move.startX < move.endX && move.startY < move.endY)
            {
                for (let j = move.startX + 1, i = move.startY + 1; i < move.endY && j < move.endX; i++, j++)
                {
                    if (board[i][j] !== '')
                    {
                        return false;
                    }
                }
            }
            if (move.startX > move.endX && move.startY < move.endY)
            {
                for (let j = move.startX - 1, i = move.startY + 1; i < move.endY && j > move.endX; i++, j--)
                {
                    if (board[i][j] !== '')
                    {
                        return false;
                    }
                }
            }
            if (move.startX < move.endX && move.startY > move.endY)
            {
                for (let j = move.startX + 1, i = move.startY - 1; i > move.endY && j < move.endX; i--, j++)
                {
                    if (board[i][j] !== '')
                    {
                        return false;
                    }
                }
            }
            if (move.startX > move.endX && move.startY > move.endY)
            {
                for (let j = move.startX - 1, i = move.startY - 1; i > move.endY && j > move.endX; i--, j--)
                {
                    if (board[i][j] !== '')
                    {
                        return false;
                    }
                }
            }
            return true;
        case ('N'):
            return (board[move.endY][move.endX] === '' || board[move.endY][move.endX].slice(1) !== piece.slice(1))
                    && ((Math.abs(move.startX - move.endX) === 1 && Math.abs(move.startY - move.endY) === 2)
                    || (Math.abs(move.startX - move.endX) === 2 && Math.abs(move.startY - move.endY) === 1));
        case ('Q'):
            return canHypoMove('R', board, move) || canHypoMove('B', board, move);
        case ('K'):
            if (board[move.endY][move.endX] === '' || board[move.endY][move.endX].slice(1) !== piece.slice(1))
            {
                return Math.abs(move.startX - move.endX) <= 1 && Math.abs(move.startY - move.endY) <= 1;
            }
            return false;
        case ('p'):
            if (move.startY === (piece.slice(1) === 'w' ? 6 : 1))
            {
                if (move.endX === move.startX)
                {
                    return (piece.slice(1) === 'w' ? move.startY - move.endY <= 2  && move.startY - move.endY > 0
                            : move.endY - move.startY <= 2 && move.endY - move.startY > 0) &&  board[move.endY][move.endX] === '';
                }
            }
            else
            {
                if (move.endX === move.startX)
                {
                    return (piece.slice(1) === 'w' ? move.startY - move.endY === 1 : move.endY - move.startY === 1) && board[move.endY][move.endX] === '';
                }

            }
            if (Math.abs(move.startX - move.endX) <= 1)
            {
                return (piece.slice(1) === 'w' ? move.startY - move.endY === 1 : move.endY - move.startY === 1) &&
                        (board[move.endY][move.endX] !== '' && board[move.endY][move.endX].slice(1) !== piece.slice(1));
            }
            return false;
        default:
            throw new Error(`Piece Error Occured: ${piece}`);
    }
}