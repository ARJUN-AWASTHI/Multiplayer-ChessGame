import {  type Color, type PieceSymbol, type Square } from 'chess.js';
import { CHESS_BOARD } from '../config';
import type { BoardSquare } from '../types';




const Board = ({ board, handleMove }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] | null,
    handleMove: any
}) => {

    let firstClick: string | null = null;
    let secondClick: string | null = null;


    function updateBoard(board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] | null): BoardSquare[][]{


        let newBoard: BoardSquare[][] = [];

        for (let r = 0; r < 8; r++) {
            newBoard.push([]);

        }

        if (board) {
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    let cell = board[r][c];
                    if (cell) {
                        newBoard[r][c] = {
                            square: cell.square,
                            type: cell.type,
                            pieceColor: cell.color
                        };
                    }
                    else {
                        
                        newBoard[r][c] = {
                            square: CHESS_BOARD[r][c],
                            type: null,
                            pieceColor: null

                        }

                    }
                }
            }
        }
        else {
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    let color: Color = ((r + c) % 2 === 0 ? "w" : "b");
                    newBoard[r][c] = {
                        square: CHESS_BOARD[r][c],
                        type: null,
                        pieceColor: color

                    }
                }
            }
        }


        return newBoard;

    }


    function handleSquareClick(sq: BoardSquare) {
        if (!firstClick) firstClick = sq.square;
        else if (sq.square !== firstClick) {
            secondClick = sq.square;
            let move = {
                from: firstClick,
                to: secondClick
            }



            handleMove(move);
            console.log(move);


            firstClick = null;
            secondClick = null;

        }
    }

    return (
        <div>
            {updateBoard(board).map((row, r) => {
                return <div key={r} className='flex'>
                    {row.map((sq, c) => {
                        return <div key={c}
                            className={`flex font-bold text-3xl items-center justify-center w-20 h-20 ${(r + c) % 2 === 0 ? "bg-slate-400" : "bg-slate-700" } ${sq && sq.pieceColor === 'w' ? "text-white" : "text-black"  } `}

                            onClick={() => handleSquareClick(sq)}
                        >
                            {sq ? sq.type : ""}
                        </div>
                    })}

                </div>
            })}

        </div>


    )
}



export default Board