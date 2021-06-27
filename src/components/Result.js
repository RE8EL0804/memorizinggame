import React from "react";
import l from "../assets/leader.png";
const Result = ({
  score,
  playAgain,
  total,
  player1Score,
  player2Score,
}) => (
  <div className="score-board">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <div className="leaderboard">
      <center><img src={l} alt="Snow" width="60%"
            height="40%" style={{marginTop:"50px"}} /></center>
      <div className="Player1">{player1Score}</div>
      <div className="Player2">{player2Score}</div>
    </div>
    <a className="playagain" onClick={playAgain}>
      Continue
    </a>
    <a className="exit" href="\">
      Exit
    </a>
  </div>
);

export default Result;
