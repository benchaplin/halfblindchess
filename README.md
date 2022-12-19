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

### *the rest*

The class `HalfBlindChess implements ChessInstance`, and the rest of the [chess.js API](https://github.com/jhlywa/chess.js/blob/master/README.md#api) is exposed in `HalfBlindChess`, unchanged from the underlying chess.js implementation.
