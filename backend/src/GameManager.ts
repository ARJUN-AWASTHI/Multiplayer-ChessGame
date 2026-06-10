import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Messages";
import { Game } from "./Game";




export class GameManager{
    private games : Game[];
    private pendingUser : WebSocket | null;
    private users : WebSocket[];


    constructor(){
        this.games = [];
        this.users= [];
        this.pendingUser = null;
        
    }


    addUser(socket : WebSocket){
        this.users.push(socket);
        this.addHandler(socket);

    }


    removeUser(socket : WebSocket){
        this.users = this.users.filter((u)=> u !== socket );
    }

    private addHandler(socket : WebSocket){
        
        socket.on("message" , (data)=>{

            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){

                if(!this.pendingUser){
                    this.pendingUser = socket;
                }
                else{

                    const game = new Game(socket , this.pendingUser);
                    this.games.push(game);
                    this.pendingUser = null;
                }

            }

            else if(message.type = MOVE){
                
                const game = this.games.find( (g)=>(g.getPlayer1() === socket || g.getPlayer2() == socket));

                if(game){
                    game.makeMove(socket , message.move);
                }
                
            }
                    





        })
    }
}