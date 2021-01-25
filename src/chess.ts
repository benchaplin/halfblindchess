import { Chess } from "chess.js";
import { ChessInstance, Move, Piece } from "chess.js";

type Board = Array<Array<Piece | null>>;
type HalfBlindBoard = Array<Array<HalfBlindPiece | null>>;

interface HalfBlindMove extends Move {
    /**
     * Whether or not the move is half-blind
     */
    halfBlind: boolean;
}

interface HalfBlindPiece extends Piece {
    /**
     * Whether or not the piece is in a half-blind state
     */
    halfBlind: boolean;
}

class HalfBlindChessGame {
    private chess: ChessInstance = new Chess();
    private moveNumber: number = 1;
    private halfBlindBoard: HalfBlindBoard = this.initializeHalfBlindBoard();

    private initializeHalfBlindBoard(): HalfBlindBoard {
        const board: Board = this.getBoard();
        return board.map((boardRow: Array<Piece | null>) => 
            boardRow.map(piece => 
                piece !== null 
                    ? { ...piece, halfBlind: false }
                    : null
            )
        );
    }

    /**
     * Get the actual game board
     * 
     * @returns Board: chess game board
     */
    public getBoard(): Board {
        return this.chess.board();
    }

    /**
     * Get the game board with half-blind information
     * 
     * @returns HalfBlindBoard: chess game board with half-blind information
     */
    public getHalfBlindBoard(): HalfBlindBoard {
        return this.halfBlindBoard;
    }

    /**
     * Make a move
     *
     * @param string: move in SAN format
     * @returns HalfBlindMove | null: Move result or null, if illegal
     */
    public move(move: string): HalfBlindMove | null {
        const moveResult: Move | null = this.chess.move(move);
        const halfBlindMoveResult: HalfBlindMove | null = moveResult !== null 
            ? { ...moveResult, halfBlind: false } 
            : null;

        if (halfBlindMoveResult !== null && this.moveNumber % 3 == 2) {
            halfBlindMoveResult.halfBlind = true;
        }

        this.moveNumber = this.moveNumber + 1;

        return halfBlindMoveResult;
    }

    /**
     * Get a list of valid moves from the current position
     *
     * @returns string[]: valid moves in SAN format
     */
    public getValidMoves(): string[] {
        return this.chess.moves({ verbose: false });
    }

    /**
     * Get board in readable format
     * 
     * @returns String: board in readable format
     */
    public getAscii(): String {
        return this.chess.ascii();
    }

    public playRandomOpening() {
        this.moveNumber = 1;

        for (let i: number = 0; i < 4; i++) {
            const possibleMoves: string[] = this.chess.moves();
            const nextMove: string =
                possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.move(nextMove);
        }
    }
}

const chess: HalfBlindChessGame = new HalfBlindChessGame();
console.log(chess.getAscii());
chess.playRandomOpening();
console.log(chess.getAscii());