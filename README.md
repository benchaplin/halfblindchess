# halfblindchess

halfblindchess is a Javascript chess library for the half-blind chess variant. The variant works as follows:

-   Every third turn, starting on black's first move, a player makes a **half-blind move**.
-   A **half-blind move** is a move in which the opposing player only sees _which_ piece was moved, not _where_ it was moved to.
    -   The position of the piece remains hidden until the next turn has been made.

This library is built on top of [chess.js](https://github.com/jhlywa/chess.js/).

## Installation

To install the stable version:

```
# npm
npm install halfblindchess

# yarn
yarn add halfblindchess
```

## API

```js
import { HalfBlindChess } from "halfblindchess";
```

### Constructor: HalfBlindChess()

Construct the chess game object with the board in the starting position.

```js
const hbchess = new HalfBlindChess();
```

Or, construct using a FEN.

```js
const hbchess = new HalfBlindChess(
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
);
```

### .ascii()

Returns a string containing an ASCII diagram of the current position. Half-blind pieces' underlying positions are shown.

```js
const hbchess = new HalfBlindChess();

// make some moves
hbchess.move("e4");
hbchess.move("e5"); // half-blind move

hbchess.ascii();
// -> '   +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p  .  p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  p  .  .  . |
//      4 | .  .  .  .  P  .  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  .  P  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'
```

### .halfBlindAscii()

Returns a string containing an ASCII diagram of the current half-blind position. Half-blind pieces' are indicated with parentheses.

```js
const hbchess = new HalfBlindChess();

// make some moves
hbchess.move("e4");
hbchess.move("e5"); // half-blind move

hbchess.halfBlindAscii();
// -> '   +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p (p) p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  .  .  .  . |
//      4 | .  .  .  .  P  .  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  .  P  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'
```

### .board()

Returns an 2D array representation of the current underlying position. Empty squares are represented by `null`.

```js
const hbchess = new HalfBlindChess();

hbchess.board();
// -> [
//      [
//        {type: 'r', color: 'b'},
//        {type: 'n', color: 'b'},
//        ...
//      ],
//      [
//        {type: 'p', color: 'b'},
//        ...
//      ],
//      [null, null, null, null, null, null, null, null],
//      ...
//    ]
```

### .halfBlindBoard()

Returns an 2D array representation of the current underlying position, with half-blind information included. Empty squares are represented by `null`.

```js
const hbchess = new HalfBlindChess();

hbchess.board();
// -> [
//      [
//        {type: 'r', color: 'b', halfBlind: false},
//        {type: 'n', color: 'b', halfBlind: false},
//        ...
//      ],
//      [
//        {type: 'p', color: 'b', halfBlind: false},
//        ...
//      ],
//      [null, null, null, null, null, null, null, null],
//      ...
//    ]
```

### .move(sanString)

Attempts to make a move on the board, returning a HalfBlindMove object if the move was legal, otherwise null. The function takes a string in Standard Algebraic Notation (SAN):

```js
const hbchess = new HalfBlindChess();

hbchess.move("e4");
// -> { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4', halfBlind: false }

hbchess.move("e1");
// -> null
```

### .moves()

Returns a list of legal moves from the current underlying position.

```js
const chess = new Chess();
chess.moves();
// -> ['a3', 'a4', 'b3', 'b4', 'c3', 'c4', 'd3', 'd4', 'e3', 'e4',
//     'f3', 'f4', 'g3', 'g4', 'h3', 'h4', 'Na3', 'Nc3', 'Nf3', 'Nh3']
```

### .halfBlindFen()

Returns the half-blind fen notation.

**Half-blind fen notation**:

-   if the last move was half-blind, prepend the 'from' and 'to' squares of the half-blind move to the fen from the previous position (see exampkes 2 and 5)
-   else, take the normal fen and prepend the number of moves until the next half-blind move (see examples 1, 3 and 4)

_Examples_:

1.  After **1. e4**, the fen would be: `0 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1` (0 moves until the next half-blind move)
2.  After **1. e4, e5** (half-blind), the fen would be: `e7e5 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1`
3.  After **1. e4, e5 2. Nf3**, the fen would be `1 rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2` (1 move until the next half-blind move)
4.  After **1. e4, e5 2. Nf3, Nc6**, the fen would be `0 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3` (0 moves until the next half-blind move)
5.  After **1. e4, e5 2. Nf3, Nc6 3. Bc4** (half-blind), the fen would be `f1c4 r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3`

```js
const hbchess = new HalfBlindChess();
hbchess.move("e4");
hbchess.move("e5"); // half-blind
hbchess.halfBlindFen();
// -> 'e7e5 rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
```

### _the rest_

The class `HalfBlindChess implements ChessInstance`, and the rest of the [chess.js API](https://github.com/jhlywa/chess.js/blob/master/README.md#api) is exposed in `HalfBlindChess`, unchanged from the underlying chess.js implementation.
