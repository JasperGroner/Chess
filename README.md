<h1 align="center">The Chess App</h1>

This is a fully featured chess app that allows for local and network play, chat during network play and matchmaking, replays of finished games, and daily puzzles.

[Play it Here](https://chess-game.herokuapp.com/)

If you don't have time to make a user and want to access online elements, saving, and daily puzzles, please feel free to use the following credentials:

Email: themainplayer@gmail.com

Password: password

(Not a real email!)

<img src="https://github.com/JasperGroner/chess/blob/main/images/board.png" align="center" width: 400px; alt="Sample chess board from game."/>

## Features: 

  - Play the classic board game chess, either locally against a friend or online (if logged in and app is deployed to the web).

  - All logic for playing chess custom built for this project:

    * All moves for each piece, including conditional moves such as pawn captures and moves that depend on board state, such as castling and en passant.

    * Checking for validity of moves. This includes determining if move will place the mover into check.

    * Determination of check and checkmate on a move-by-move basis.
  
  - Saving of every turn of every game played by a logged-in user, so that the game can be picked up at any time and replayed on a move-by-move basis after it is completed.

  - In-game chat in the matchmaking lobby for online play and during online matches.

  - Chess puzzles where you have a set number of moves to mate the computer opponent. Twenty new chess puzzles loaded daily from the [Lichess database](https://database.lichess.org/#puzzles) if you have an API key from [Chess Puzzles](https://rapidapi.com/KeeghanM/api/chess-puzzles).

## To set up locally:

  - Clone the repository

  - Set up your .env based on .env.example. This will require you to have an API key from [Chess Puzzles](https://rapidapi.com/KeeghanM/api/chess-puzzles)

  - Run `yarn install`

  - Run `createdb chess_development`

  - Navigate to the server folder and run:

    * `yarn migrate:latest`

    * `yarn db:seed`

  - Navigate to the app root directory and run `yarn dev`

  - Go to `localhost:3000` in a browser to see the app!

## Creator:

Jasper Groner

## Technologies used: 

Front End: ReactJS, Sass/CSS, HTML

Back End: NodeJS, Express, Socket.io, Objection, Knex

## Attributions:

[Chess Icons Vectors by Vecteezy]("https://www.vecteezy.com/free-vector/chess-icons")