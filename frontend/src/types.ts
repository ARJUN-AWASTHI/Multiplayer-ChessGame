import type { Color, PieceSymbol, Square } from "chess.js";

export type BoardSquare = {
    square: Square;
    type: PieceSymbol | null;
    pieceColor: Color | null;
};
