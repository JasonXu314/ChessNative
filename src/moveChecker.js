const check = (move, board) => {
    const piece = move.piece.slice(0, 1);
    const color = move.piece.slice(1);
    const control = generateControl(board, color === 'w' ? 'b' : 'w');

    switch (piece)
    {
        
    }
};

export default check;

function generateControl(board, color)
{

}