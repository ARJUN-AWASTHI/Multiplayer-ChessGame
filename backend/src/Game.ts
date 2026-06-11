import { Chess, WHITE } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";


interface Move {
    from : string;
    to : string;
}



export class Game {

    private player1: WebSocket;
    private player2: WebSocket;
    private board: Chess;
    private startTime: Date;
  

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "w"
            }
        }))

        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "b"
            }
        }))
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }

    makeMove(socket: WebSocket, move: Move) {
        //validate move
        if(this.board.turn() === "w" && socket === this.player2) return;
        if(this.board.turn() === "b" && socket === this.player1) return;
       


        try{
            this.board.move(move);

        }catch(e){
            console.log(move)
            console.log("illegal move")
            return;
        }

        //check for game end condition
        if(this.board.isGameOver()){


            this.player1.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "b" : "w"
                }
            }));

            this.player2.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "b" : "w"
                }
            }));



            return ;
        }

        //send moves to both parties

        if(this.board.turn() === 'w' ){
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        else{

            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))

        }


        

    }

}
