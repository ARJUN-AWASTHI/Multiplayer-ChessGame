

import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
const PORT = Number.parseInt(process.env.PORT || "8080");


console.log(PORT)
const wss = new WebSocketServer({ port: PORT });


const gameManger = new GameManager();

wss.on("connection", (ws) => {
    console.log("connected user");
    console.log();

    gameManger.addUser(ws);

    ws.on("close", () => gameManger.removeUser(ws));



});