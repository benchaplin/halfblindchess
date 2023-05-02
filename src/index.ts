import { Chess, ChessInstance, Comment, Move, Piece, ShortMove, Square } from "chess.js";

export type Board = Array<Array<Piece | null>>;
export type HalfBlindBoard = Array<Array<HalfBlindPiece | null>>;

export * from "chess.js";

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

export const DEFAULT_POSITION =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export class HalfBlindChess implements ChessInstance {
    private chess: ChessInstance = new Chess();
    private moveNumber = 1;
    private hbBoard = this.initializeHalfBlindBoard();

    private initializeHalfBlindBoard(): HalfBlindBoard {
        const board = this.board();
        return this.convertBoardToHalfBlindBoard(board);
    }

    public constructor(fen = DEFAULT_POSITION) {
        this.load(fen)
        if (fen != DEFAULT_POSITION) {
            let calcMoveNumber = parseInt(fen.split(" ")[5]) * 2 - 1;
            if (fen.split(" ")[1] == "b") calcMoveNumber++;
            this.moveNumber = calcMoveNumber;
        }
    }

    /** The string that represents the White color side */
    public readonly WHITE = this.chess.WHITE;

    /** The string that represents the Black color side */
    public readonly BLACK = this.chess.BLACK;

    /** The string that represents a Pawn */
    public readonly PAWN = this.chess.PAWN;

    /** The string that represents a Knight */
    public readonly KNIGHT = this.chess.KNIGHT;

    /** The string that represents a Bishop */
    public readonly BISHOP = this.chess.BISHOP;

    /** The string that represents a Rook */
    public readonly ROOK = this.chess.ROOK;

    /** The string that represents a Queen */
    public readonly QUEEN = this.chess.QUEEN;

    /** The string that represents a King */
    public readonly KING = this.chess.KING;

    /** A list of all the squares in the game, from "a1" to "h8" */
    public readonly SQUARES = this.chess.SQUARES;

    /** Flags used to build flag strings for moves */
    public readonly FLAGS = this.chess.FLAGS;

    /**
     * Get half-blind status of last move on the board.
     *
     * @returns boolean
     */
    public lastMoveHalfBlind(): boolean {
        return (this.moveNumber - 1) % 3 == 2;
    }

    /**
     * Get board in readable format.
     *
     * @returns string: board in readable format
     */
    public ascii(): string {
        return this.chess.ascii();
    }

    /**
     * Get half-blind board in readable format.
     * (Refactored from chess.js)
     *
     * @returns string: half-blind board in readable format
     */
    public halfBlindAscii(): string {
        let s = "   +------------------------+\n";
        for (let i = 0; i < 8; i++) {
            for (let j = -1; j < 9; j++) {
                if (j === -1) {
                    s += ` ${8 - i} |`;
                } else if (j === 8) {
                    s += "|\n";
                } else {
                    if (this.hbBoard[i][j] === null) {
                        s += " . ";
                    } else {
                        const piece = this.hbBoard[i][j]?.type;
                        const color = this.hbBoard[i][j]?.color;
                        const halfBlind = this.hbBoard[i][j]?.halfBlind;
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
     * Get the actual game board.
     *
     * @returns Board: chess game board
     */
    public board(): Board {
        return this.chess.board();
    }

    /**
     * Get the game board with half-blind information.
     *
     * @returns HalfBlindBoard: chess game board with half-blind information
     */
    public halfBlindBoard(): HalfBlindBoard {
        return this.hbBoard;
    }

    /**
     * Make a move.
     *
     * @param string: move in SAN format
     * @returns HalfBlindMove | null: Move result or null, if illegal
     */
    public move(move: string | ShortMove): HalfBlindMove | null {
        const moveResult = this.chess.move(move);
        const halfBlindMoveResult =
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
            this.hbBoard = this.convertBoardToHalfBlindBoard(
                this.chess.board()
            );
        } else {
            const [fromCoordinate, toCoordinate] = [
                this.squareToBoardCoordinates(halfBlindMoveResult.from),
                this.squareToBoardCoordinates(halfBlindMoveResult.to),
            ];

            let piece =
                this.hbBoard[fromCoordinate[0]][fromCoordinate[1]];

            if (piece !== null)
                piece = {
                    ...piece,
                    halfBlind: true,
                };
            this.hbBoard[fromCoordinate[0]][fromCoordinate[1]] = piece;
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
     * Returns a list of legal moves from the current position.
     * The function takes an optional parameter which controls the
     * single-square move generation and verbosity.
     * @param options an optional parameter which controls the single-square
     * move generation and verbosity.
     * @returns The list of all valid moves, either in SAN format, or as
     * verbose objects.
     */
    public moves(options: { verbose: true; square?: string | undefined; }): Move[];
    public moves(options?: { verbose?: false; square?: string; }): string[];
    public moves(options?: { verbose?: boolean, square?: string }): Move[] | string[] {
        return this.chess.moves(options);
    }

    /**
     * The board is cleared, and the FEN string is loaded.
     * Returns true if the position was successfully loaded, otherwise false
     * @param fen the fen formatted string to load
     * @returns true if the position was successfully loaded, otherwise
     * false
     */
    public load(fen: string): boolean {
        return this.chess.load(fen);
    }

    /**
     * Reset the board to the initial starting position.
     */
    public reset(): void {
        return this.chess.reset();
    }

    /**
     * Returns true or false if the side to move is in check.
     * @returns true or false if the side to move is in check.
     */
    public in_check(): boolean {
        return this.chess.in_check();
    }

    /**
     * Returns true or false if the side to move has been checkmated.
     * @returns true or false if the side to move has been checkmated.
     */
    public in_checkmate(): boolean {
        return this.chess.in_checkmate();
    }

    /**
     * Returns true or false if the side to move has been stalemated.
     * @returns true or false if the side to move has been stalemated.
     */
    public in_stalemate(): boolean {
        return this.chess.in_stalemate();
    }

    /**
     * Returns true or false if the game is drawn (50-move rule or
     * insufficient material).
     * @returns true or false if the game is drawn (50-move rule or
     * insufficient material).
     */
    public in_draw(): boolean {
        return this.chess.in_draw();
    }

    /**
     * Returns true if the game is drawn due to insufficient material
     * (K vs. K, K vs. KB, or K vs. KN); otherwise false.
     * @returns true if the game is drawn due to insufficient material
     * (K vs. K, K vs. KB, or K vs. KN); otherwise false.
     */
    public insufficient_material(): boolean {
        return this.chess.insufficient_material();
    }

    /**
     * Returns true or false if the current board position has occurred three
     * or more times.
     * @returns true or false if the current board position has occurred three
     * or more times.
     */
    public in_threefold_repetition(): boolean {
        return this.chess.in_threefold_repetition();
    }

    /**
     * Returns true if the game has ended via checkmate, stalemate, draw,
     * threefold repetition, or insufficient material.
     * Otherwise, returns false.
     * @returns true if the game has ended via checkmate, stalemate, draw,
     * threefold repetition, or insufficient material. Otherwise, returns
     * false.
     */
    public game_over(): boolean {
        return this.chess.game_over();
    }

    /**
     * Returns a validation object specifying validity or the errors found
     * within the FEN string.
     * @param fen the fen formatted string to validate
     */
    public validate_fen(
        fen: string,
    ): ({
        /** Indicates if the fen is valid or not. */
        valid: boolean;

        /**
         * If not valid, then this will a type of error used internally in
         * chess.js. Otherwise 0.
         */
        error_number: number;

        /**
         * The string "No errors." if valid. Otherwise a string explaining why
         * it is not valid.
         */
        error: string;
    }) {
        return this.chess.validate_fen(fen);
    }

    /**
     * Get the actual game board in FEN format.
     *
     * @returns string: board in FEN format
     */
    public fen(): string {
        return this.chess.fen();
    }

    /**
     * Returns the game in PGN format.
     * Options is an optional parameter which may include max width and/or a
     * newline character settings.
     * @param options optional object which may include max width and/or a
     * newline character settings.
     * @returns the current game state in PGN format.
     */
    public pgn(options?: {
        /** the maximum width of a line */
        max_width?: number;
        /** Specific newline character */
        newline_char?: string;
    }): string {
        return this.chess.pgn(options);
    }

    /**
     * Load the moves of a game stored in Portable Game Notation.
     * @param pgn the pgn should be a string in Portable Game Notation.
     * @param options An optional object which may contain a string
     * newline_char and a boolean sloppy.
     * @returns The method will return true if the PGN was parsed successfully,
     * otherwise false.
     */
    public load_pgn(
        pgn: string,
        options?: {
            /**
             * The newline_char is a string representation of a valid RegExp
             * fragment and is used to process the PGN.
             * It defaults to \r?\n.
             * Special characters should not be pre-escaped, but any literal
             * special characters should be escaped as is normal for a RegExp.
             * Keep in mind that backslashes in JavaScript strings must
             * themselves be escaped.
             * Avoid using a newline_char that may occur elsewhere in a PGN,
             * such as . or x, as this will result in unexpected behavior.
             */
            newline_char?: string;

            /**
             * The sloppy flag is a boolean that permits chess.js to parse moves in
             * non-standard notations.
             * See .move documentation for more information about non-SAN
             * notations.
             */
            sloppy?: boolean;
        },
    ): boolean {
        return this.chess.load_pgn(pgn, options);
    }

    /**
     * Allows header information to be added to PGN output.
     * Any number of key/value pairs can be passed to .header(), with each
     * first arg being treated as a header key, and each second as the value.
     * @param args (optional) Header pairs to store in the header.
     * @returns The current header information after storing any values.
     */
    public header(...args: string[]): ({ [key: string]: string | undefined }) {
        return this.chess.header(...args);
    }

    /**
     * Returns the current side to move.
     * @returns "b" if Black is the side to move, otherwise "w" for White.
     */
    public turn(): 'b' | 'w' {
        return this.chess.turn();
    }

    /**
     * Take back the last half-move, returning a move object if successful,
     * otherwise null.
     * @returns the move object that was undone if successful, otherwise null.
     */
    public undo(): Move | null {
        return this.chess.undo();
    }

    /**
     * Clears the board of all pieces.
     */
    public clear(): void {
        return this.chess.clear();
    }

    /**
     * Place a piece on the square where piece is an object with the form
     * { type: ..., color: ... }.
     * put() will fail when passed an invalid piece or square, or when two
     * or more kings of the same color are placed.
     * @param piece the piece to put somewhere on the game board.
     * @param square the square on the chess board to place the piece at.
     * @returns true if the piece was successfully placed, otherwise, the
     * board remains unchanged and false is returned.
     */
    public put(piece: Piece, square: Square): boolean {
        return this.chess.put(piece, square);
    }

    /**
     * Returns the piece on the square
     * @param square the square to get the piece on.
     * @returns null if no piece is on that square, or it is not a valid
     * square. Otherwise a piece object.
     */
    public get(square: Square): Piece | null {
        return this.chess.get(square);
    }

    /**
     * Remove and return the piece on square.
     * @param square the square to remove the piece from, e.g. "b6"
     * @returns null if no piece was removed, otherwise an object with the
     * removed piece's type and color.
     */
    public remove(square: Square): Piece | null {
        return this.chess.remove(square);
    }

    /**
     * Returns the color of the square ('light' or 'dark').
     * @param square the square to check if it is light or dark.
     * @returns "light" if a light square, "dark" if a dark square, or null if
     * not a valid square.
     */
    public square_color(square: Square): 'light' | 'dark' {
        return this.chess.square_color(square);
    }

    /**
     * Returns a list containing the moves of the current game.
     * Options is an optional parameter which may contain a 'verbose' flag.
     * See .moves() for a description of the verbose move fields.
     * @param options an optional parameter which may contain a 'verbose' flag.
     * @returns a list of all moves of the current game. They will be strings
     * if not passed the verbose flag.
     */
    public history(options?: { verbose?: false }): string[];
    public history(options: { verbose: true }): Move[];
    public history(options?: {
        /**
         * Pass true if you want this function to output verbose objects
         * instead of strings.
         */
        verbose?: boolean;
    }): string[] | Move[] {
        return this.chess.history(options);
    }

    public get_comment(): string | undefined {
        return this.chess.get_comment();
    }

    public set_comment(comment: string): void {
        return this.chess.set_comment(comment);
    }

    public delete_comment(): string | undefined {
        return this.chess.delete_comment();
    }

    public get_comments(): Comment[] {
        return this.chess.get_comments();
    }

    public delete_comments(): Comment[] {
        return this.chess.delete_comments();
    }
}
