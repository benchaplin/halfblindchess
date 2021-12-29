import HalfBlindChess, { HalfBlindMove } from "../";

test("constructor should initialize a game board", () => {
    const hbchess: HalfBlindChess = new HalfBlindChess();
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
    const hbchess: HalfBlindChess = new HalfBlindChess();
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

test("move should return a HalfBlindMove object if legal", () => {
    const hbchess: HalfBlindChess = new HalfBlindChess();
    const move: HalfBlindMove | null = hbchess.move("e4");
    expect(move?.color).toBe("w");
    expect(move?.flags).toBe("b");
    expect(move?.piece).toBe("p");
    expect(move?.san).toBe("e4");
    expect(move?.halfBlind).toBe(false);
});

test("move should return null if illegal", () => {
    const hbchess: HalfBlindChess = new HalfBlindChess();
    const move: HalfBlindMove | null = hbchess.move("e5");
    expect(move).toBeNull();
});

test("second move should be halfBlind", () => {
    const hbchess: HalfBlindChess = new HalfBlindChess();
    hbchess.move("e4");
    const move: HalfBlindMove | null = hbchess.move("e5");
    expect(move?.halfBlind).toBe(true);
});

test("normal move should move the piece on the half-blind board", () => {
    const hbchess: HalfBlindChess = new HalfBlindChess();
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
    const hbchess: HalfBlindChess = new HalfBlindChess();
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
    const hbchess: HalfBlindChess = new HalfBlindChess();
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
