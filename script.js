var board,
  chessGame = new Chess();

/*The "AI" part starts here */

var rootFunction = function (depth, chessGame, player) {
  var moves = chessGame.ugly_moves();
  var best = -9999;
  var moveFound;

  for (var i = 0; i < moves.length; i++) {
    var newMove = moves[i];
    chessGame.ugly_move(newMove);
    var value = alphaBeta(depth - 1, chessGame, -10000, 10000, !player);
    chessGame.undo();
    if (value >= best) {
      best = value;
      moveFound = newMove;
    }
  }
  return moveFound;
};

var alphaBeta = function (depth, chessGame, alpha, beta, player) {
  pos++;
  if (depth === 0) {
    return -evalBoard(chessGame.board());
  }

  var newMoves = chessGame.ugly_moves();

  if (player) {
    var best = -9999;
    for (var i = 0; i < newMoves.length; i++) {
      chessGame.ugly_move(newMoves[i]);
      best = Math.max(
        best,
        alphaBeta(depth - 1, chessGame, alpha, beta, !player)
      );
      chessGame.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) {
        return best;
      }
    }
    return best;
  } else {
    var best = 9999;
    for (var i = 0; i < newMoves.length; i++) {
      chessGame.ugly_move(newMoves[i]);
      best = Math.min(
        best,
        alphaBeta(depth - 1, chessGame, alpha, beta, !player)
      );
      chessGame.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) {
        return best;
      }
    }
    return best;
  }
};

var evalBoard = function (board) {
  var totalEval = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEval = totalEval + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEval;
};

var revArr = function (arr) {
  return arr.slice().reverse();
};

var pawnWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

var pawnBlack = revArr(pawnWhite);

var knight = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

var bishopWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

var bishopBlack = revArr(bishopWhite);

var rookWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

var rookBlack = revArr(rookWhite);

var queen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

var kingWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

var kingBlack = revArr(kingWhite);

var getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  var absVal = function (piece, isWhite, x, y) {
    if (piece.type === "p") {
      return 10 + (isWhite ? pawnWhite[y][x] : pawnBlack[y][x]);
    } else if (piece.type === "r") {
      return 50 + (isWhite ? rookWhite[y][x] : rookBlack[y][x]);
    } else if (piece.type === "n") {
      return 30 + knight[y][x];
    } else if (piece.type === "b") {
      return 30 + (isWhite ? bishopWhite[y][x] : bishopBlack[y][x]);
    } else if (piece.type === "q") {
      return 90 + queen[y][x];
    } else if (piece.type === "k") {
      return 900 + (isWhite ? kingWhite[y][x] : kingBlack[y][x]);
    }
    throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = absVal(piece, piece.color === "w", x, y);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

/* board visualization and games state handling */

var onStart = function (src, piece, pos, orientation) {
  if (
    chessGame.in_checkmate() === true ||
    chessGame.in_draw() === true ||
    piece.search(/^b/) !== -1
  ) {
    return false;
  }
};

var makeBestMove = function () {
  var bestMove = getBestMove(chessGame);
  chessGame.ugly_move(bestMove);
  board.position(chessGame.fen());
  moveHistory(chessGame.history());
  if (chessGame.game_over()) {
    alert("Game over");
  }
};

var pos;
var getBestMove = function (game) {
  if (game.game_over()) {
    alert("Game over");
  }

  pos = 0;
  var depth = parseInt($("#search-depth").find(":selected").text());

  var d = new Date().getTime();
  var bestMove = rootFunction(depth, game, true);
  var d2 = new Date().getTime();
  var moveTime = d2 - d;
  var posPerSec = (pos * 1000) / moveTime;

  $("#position-count").text(pos);
  $("#time").text(moveTime / 1000 + "s");
  $("#positions-per-s").text(posPerSec);
  return bestMove;
};

var moveHistory = function (moves) {
  var historyEle = $("#move-history").empty();
  historyEle.empty();
  for (var i = 0; i < moves.length; i = i + 2) {
    historyEle.append(
      "<span>" +
        moves[i] +
        " " +
        (moves[i + 1] ? moves[i + 1] : " ") +
        "</span><br>"
    );
  }
  historyEle.scrollTop(historyEle[0].scrollHeight);
};

var onDrop = function (source, target) {
  var move = chessGame.move({
    from: source,
    to: target,
    promotion: "q",
  });

  removeGreySquares();
  if (move === null) {
    return "snapback";
  }

  moveHistory(chessGame.history());
  window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
  board.position(chessGame.fen());
};

var onMouseoverSquare = function (square, piece) {
  var moves = chessGame.moves({
    square: square,
    verbose: true,
  });

  if (moves.length === 0) return;

  greySquare(square);

  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function (square, piece) {
  removeGreySquares();
};

var removeGreySquares = function () {
  $("#board .square-55d63").css("background", "");
};

var greySquare = function (square) {
  var squareEl = $("#board .square-" + square);

  var background = "#a9a9a9";
  if (squareEl.hasClass("black-3c85d") === true) {
    background = "#696969";
  }

  squareEl.css("background", background);
};

var cfg = {
  draggable: true,
  position: "start",
  onDragStart: onStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};
board = ChessBoard("board", cfg);
