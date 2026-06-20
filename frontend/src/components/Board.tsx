import { type Color, type PieceSymbol, type Square } from 'chess.js';
import { CHESS_BOARD } from '../config';
import type { BoardSquare } from '../types';

import bb from "../assets/pieces/bishop-b.svg";
import wb from "../assets/pieces/bishop-w.svg";
import bk from "../assets/pieces/king-b.svg";
import wk from "../assets/pieces/king-w.svg";
import bn from "../assets/pieces/knight-b.svg";
import wn from "../assets/pieces/knight-w.svg";
import bp from "../assets/pieces/pawn-b.svg";
import wp from "../assets/pieces/pawn-w.svg";
import bq from "../assets/pieces/queen-b.svg";
import wq from "../assets/pieces/queen-w.svg";
import br from "../assets/pieces/rook-b.svg";
import wr from "../assets/pieces/rook-w.svg";

const pieceImages = {
    bb: bb, wb: wb,
    bk: bk, wk: wk,
    bn: bn, wn: wn,
    bp: bp, wp: wp,
    bq: bq, wq: wq,
    br: br, wr: wr
};





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
    } | null)[][] | null): BoardSquare[][] {


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


        console.log(sq)
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
                            className={`flex font-bold items-center justify-center w-20 h-20 p-1 ${(r + c) % 2 === 0 ? "bg-slate-400" : "bg-slate-700"} `}

                            onClick={() => handleSquareClick(sq)}

                        >



                            {

                                sq.type ? <img
                                    //@ts-ignore
                                    src={pieceImages[`${sq.pieceColor}${sq.type.toLowerCase()}`]}
                                    className=''
                                    alt=""
                                /> : null


                            }

                        </div>
                    })}

                </div>
            })}

        </div>


    )
}



export default Board