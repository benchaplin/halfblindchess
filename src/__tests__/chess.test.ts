import { HalfBlindChess } from "../";

test("constructor should initialize a game board", () => {
    const hbchess = new HalfBlindChess();
    expect(hbchess.board()).toEqual([
        [
            { color: "b", type: "r" },
            { color: "b", type: "n" },
            { color: "b", type: "b" },
            { color: "b", type: "q" },
            { color: "b", type: "k" },
            { color: "b", type: "b" },
            { color: "b", type: "n" },
            { color: "b", type: "r" },
        ],
        [
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
            { color: "b", type: "p" },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
            { color: "w", type: "p" },
        ],
        [
            { color: "w", type: "r" },
            { color: "w", type: "n" },
            { color: "w", type: "b" },
            { color: "w", type: "q" },
            { color: "w", type: "k" },
            { color: "w", type: "b" },
            { color: "w", type: "n" },
            { color: "w", type: "r" },
        ],
    ]);
});

test("constructor should initialize a half-blind board", () => {
    const hbchess = new HalfBlindChess();
    expect(hbchess.halfBlindBoard()).toEqual([
        [
            { halfBlind: false, color: "b", type: "r" },
            { halfBlind: false, color: "b", type: "n" },
            { halfBlind: false, color: "b", type: "b" },
            { halfBlind: false, color: "b", type: "q" },
            { halfBlind: false, color: "b", type: "k" },
            { halfBlind: false, color: "b", type: "b" },
            { halfBlind: false, color: "b", type: "n" },
            { halfBlind: false, color: "b", type: "r" },
        ],
        [
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
            { halfBlind: false, color: "b", type: "p" },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
            { halfBlind: false, color: "w", type: "p" },
        ],
        [
            { halfBlind: false, color: "w", type: "r" },
            { halfBlind: false, color: "w", type: "n" },
            { halfBlind: false, color: "w", type: "b" },
            { halfBlind: false, color: "w", type: "q" },
            { halfBlind: false, color: "w", type: "k" },
            { halfBlind: false, color: "w", type: "b" },
            { halfBlind: false, color: "w", type: "n" },
            { halfBlind: false, color: "w", type: "r" },
        ],
    ]);
});

test("constructor should take a normal fen", () => {
    const fen = "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2";
    const hbchess = new HalfBlindChess(fen);
    expect(hbchess.fen()).toEqual(fen);
});

test("constructor should take a half-blind fen move 0", () => {
    const hbFen = "1 rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
});

test("constructor should take a half-blind fen move 1", () => {
    const hbFen = "0 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
});

test("constructor should take a half-blind fen move 2", () => {
    const hbFen = "e7e5 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2");
});

test("constructor should take a half-blind fen move 3", () => {
    const hbFen = "1 rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");
});

test("constructor should take a half-blind fen move 4", () => {
    const hbFen = "0 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3");
});

test("constructor should take a half-blind fen move 5", () => {
    const hbFen = "f1c4 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";
    const hbchess = new HalfBlindChess(hbFen);
    expect(hbchess.fen()).toEqual("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3");
});

test("move should return a HalfBlindMove object if legal", () => {
    const hbchess = new HalfBlindChess();
    const move = hbchess.move("e4");
    expect(move?.color).toBe("w");
    expect(move?.flags).toBe("b");
    expect(move?.piece).toBe("p");
    expect(move?.san).toBe("e4");
    expect(move?.halfBlind).toBe(false);
});

test("move should accept a ShortMove and return a HalfBlindMove object if legal", () => {
    const hbchess = new HalfBlindChess();
    const move = hbchess.move({ from: "e2", to: "e4" });
    expect(move?.color).toBe("w");
    expect(move?.flags).toBe("b");
    expect(move?.piece).toBe("p");
    expect(move?.san).toBe("e4");
    expect(move?.halfBlind).toBe(false);
});

test("move should return null if illegal", () => {
    const hbchess = new HalfBlindChess();
    const move = hbchess.move("e5");
    expect(move).toBeNull();
});

test("second move should be halfBlind", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    const move = hbchess.move("e5");
    expect(move?.halfBlind).toBe(true);
});

test("normal move should move the piece on the half-blind board", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    expect(hbchess.halfBlindAscii()).toBe(
        `   +------------------------+
 8 | r  n  b  q  k  b  n  r |
 7 | p  p  p  p  p  p  p  p |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  .  .  . |
 4 | .  .  .  .  P  .  .  . |
 3 | .  .  .  .  .  .  .  . |
 2 | P  P  P  P  .  P  P  P |
 1 | R  N  B  Q  K  B  N  R |
   +------------------------+
     a  b  c  d  e  f  g  h\n`
    );
});

test("half-blind move should not move the piece on the half-blind board", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5");
    expect(hbchess.halfBlindAscii()).toBe(
        `   +------------------------+
 8 | r  n  b  q  k  b  n  r |
 7 | p  p  p  p (p) p  p  p |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  .  .  . |
 4 | .  .  .  .  P  .  .  . |
 3 | .  .  .  .  .  .  .  . |
 2 | P  P  P  P  .  P  P  P |
 1 | R  N  B  Q  K  B  N  R |
   +------------------------+
     a  b  c  d  e  f  g  h\n`
    );
});

test("move after a half-blind move should move both the half-blind piece and the normal piece on the half-blind board", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5");
    hbchess.move("Nf3");
    expect(hbchess.halfBlindAscii()).toBe(
        `   +------------------------+
 8 | r  n  b  q  k  b  n  r |
 7 | p  p  p  p  .  p  p  p |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  p  .  .  . |
 4 | .  .  .  .  P  .  .  . |
 3 | .  .  .  .  .  N  .  . |
 2 | P  P  P  P  .  P  P  P |
 1 | R  N  B  Q  K  B  .  R |
   +------------------------+
     a  b  c  d  e  f  g  h\n`
    );
});

test("halfBlindFen should return correct fen move 0", () => {
    const hbchess = new HalfBlindChess();
    expect(hbchess.halfBlindFen()).toBe("1 rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
});

test("halfBlindFen should return correct fen move 1", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    expect(hbchess.halfBlindFen()).toBe("0 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
});

test("halfBlindFen should return correct fen move 2", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5"); // half-blind
    expect(hbchess.halfBlindFen()).toBe("e7e5 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
});

test("halfBlindFen should return correct fen move 3", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5"); // half-blind
    hbchess.move("Nf3");
    expect(hbchess.halfBlindFen()).toBe("1 rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");
});

test("halfBlindFen should return correct fen move 4", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5"); // half-blind
    hbchess.move("Nf3");
    hbchess.move("Nc6");
    expect(hbchess.halfBlindFen()).toBe("0 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3");
});

test("halfBlindFen should return correct fen move 5", () => {
    const hbchess = new HalfBlindChess();
    hbchess.move("e4");
    hbchess.move("e5"); // half-blind
    hbchess.move("Nf3");
    hbchess.move("Nc6");
    hbchess.move("Bc4"); // half-blind
    expect(hbchess.halfBlindFen()).toBe("f1c4 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3");
});
