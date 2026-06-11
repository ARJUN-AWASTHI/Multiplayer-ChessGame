import { useEffect, useRef, useState } from 'react';
import Board from '../components/Board'
import { useSocket } from '../hooks/useSocket';
import { Chess } from 'chess.js';
import type { MoveInterface } from '../config';

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

const GamePage = () => {
    const socket = useSocket();
    
    // 1. Move Chess instance to a mutable ref instead of useState
    const chessRef = useRef(new Chess());
    const [board, setBoard] = useState(chessRef.current.board());
    const playerColorRef = useRef("");

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case INIT_GAME:
                    console.log("INIT_GAME");
                    initializeGame(message);
                    break;
                case MOVE:
                    console.log("MOVE");
                    handleMoveRecieve(message);
                    break;
                case GAME_OVER:
                    console.log("GAME_OVER");
                    break;
            }
            console.log(message);
        }
    }, [socket]); 

    if (!socket) return <div> connecting ...</div>

    function handleMove(data: MoveInterface) {
        // Access via chessRef.current
        if (chessRef.current.turn() !== playerColorRef.current) return;

        try {
            chessRef.current.move(data);
            setBoard(chessRef.current.board()); 

            const message = {
                type: MOVE,
                payload: data
            }
            socket?.send(JSON.stringify(message));

        } catch (error) {
            console.log('error making the move', error);
        }
    }

    function initializeGame(message) {
        
        chessRef.current = new Chess();
        setBoard(chessRef.current.board()); 

        let color: string = message.payload.color;
        playerColorRef.current = color;
    }

    function handleMoveRecieve(message) {
        try {
            
            chessRef.current.move(message.payload);
            setBoard(chessRef.current.board());
            
           
        } catch (error) {
            console.log("error on receiving move", error);
        }
    }

    function handleStartGame() {
        if (!socket) return;
        socket.send(JSON.stringify({
            type: INIT_GAME
        }));
    }

    return (
        <div className='w-screen h-screen p-8'>
            <div className='flex h-full justify-evenly '>
                <div className="w-200 ">
                    <Board board={board} handleMove={handleMove} />
                </div>
                <div className='border flex justify-between items-center w-90 '>
                    <button onClick={handleStartGame} className="rounded-lg shadow-2xl px-3 py-2 text-3xl w-full mx-10 text-white bg-lime-600 ">
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GamePage;