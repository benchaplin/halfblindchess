import { Chess, ChessInstance, Move, Piece } from "chess.js";

type Board = Array<Array<Piece | null>>;
type HalfBlindBoard = Array<Array<HalfBlindPiece | null>>;

export interface HalfBlindMove extends Move {
    /**
     * Whether or not the move is half-blind.
     */
    halfBlind: boolean;
}

export interface HalfBlindPiece extends Piece {
    /**
     * Whether or not the piece is in a half-blind state.
     */
    halfBlind: boolean;
}

export default class HalfBlindChessGame {
    private chess: ChessInstance = new Chess();
    private moveNumber: number = 1;
    private halfBlindBoard: HalfBlindBoard = this.initializeHalfBlindBoard();

    private initializeHalfBlindBoard(): HalfBlindBoard {
        const board: Board = this.getBoard();
        return this.convertBoardToHalfBlindBoard(board);
    }

    /**
     * Get the actual game board.
     *
     * @returns Board: chess game board
     */
    public getBoard(): Board {
        return this.chess.board();
    }

    /**
     * Get the game board with half-blind information.
     *
     * @returns HalfBlindBoard: chess game board with half-blind information
     */
    public getHalfBlindBoard(): HalfBlindBoard {
        return this.halfBlindBoard;
    }

    /**
     * Make a move.
     *
     * @param string: move in SAN format
     * @returns HalfBlindMove | null: Move result or null, if illegal
     */
    public move(move: string): HalfBlindMove | null {
        const moveResult: Move | null = this.chess.move(move);
        const halfBlindMoveResult: HalfBlindMove | null =
            moveResult !== null
                ? { ...moveResult, halfBlind: this.moveNumber % 3 == 2 }
                : null;

        if (halfBlindMoveResult !== null)
            this.updateHalfBlindBoard(halfBlindMoveResult);

        this.moveNumber = this.moveNumber + 1;

        return halfBlindMoveResult;
    }

    private updateHalfBlindBoard(halfBlindMoveResult: HalfBlindMove): void {
        if (!halfBlindMoveResult.halfBlind) {
            this.halfBlindBoard = this.convertBoardToHalfBlindBoard(
                this.chess.board()
            );
        } else {
            const [fromCoordinate, toCoordinate] = [
                this.squareToBoardCoordinates(halfBlindMoveResult.from),
                this.squareToBoardCoordinates(halfBlindMoveResult.to),
            ];

            let piece: HalfBlindPiece | null =
                this.halfBlindBoard[fromCoordinate[0]][fromCoordinate[1]];

            if (piece !== null)
                piece = {
                    ...piece,
                    halfBlind: true,
                };
            this.halfBlindBoard[fromCoordinate[0]][fromCoordinate[1]] = piece;
        }
    }

    private convertBoardToHalfBlindBoard(board: Board): HalfBlindBoard {
        return board.map(row =>
            row.map(square => {
                return square !== null
                    ? { ...square, halfBlind: false }
                    : square;
            })
        );
    }

    private squareToBoardCoordinates(square: string): [number, number] {
        return ["87654321".indexOf(square[1]), "abcdefgh".indexOf(square[0])];
    }

    /**
     * Get a list of valid moves from the current position.
     *
     * @returns string[]: valid moves in SAN format
     */
    public getValidMoves(): string[] {
        return this.chess.moves({ verbose: false });
    }

    /**
     * Get board in readable format.
     *
     * @returns string: board in readable format
     */
    public getAscii(): string {
        return this.chess.ascii();
    }

    /**
     * Get half-blind board in readable format.
     * (Refactored from chess.js)
     *
     * @returns string: half-blind board in readable format
     */
    public getHalfBlindAscii(): string {
        let s = "   +------------------------+\n";
        for (let i = 0; i < 8; i++) {
            for (let j = -1; j < 9; j++) {
                if (j === -1) {
                    s += ` ${8 - i} |`;
                } else if (j === 8) {
                    s += "|\n";
                } else {
                    if (this.halfBlindBoard[i][j] === null) {
                        s += " . ";
                    } else {
                        const piece = this.halfBlindBoard[i][j]?.type;
                        const color = this.halfBlindBoard[i][j]?.color;
                        const halfBlind = this.halfBlindBoard[i][j]?.halfBlind;
                        var symbol = halfBlind
                            ? color === "w"
                                ? `(${piece?.toUpperCase()})`
                                : `(${piece?.toLowerCase()})`
                            : color === "w"
                            ? ` ${piece?.toUpperCase()} `
                            : ` ${piece?.toLowerCase()} `;
                        s += symbol;
                    }
                }
            }
        }
        s += "   +------------------------+\n";
        s += "     a  b  c  d  e  f  g  h\n";

        return s;
    }

    /**
     * Get the actual game board in FEN format.
     *
     * @returns string: board in FEN format
     */
    public getFen(): string {
        return this.chess.fen();
    }
}
