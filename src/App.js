import React, { Component } from "react";
import "./App.css";
import "./assets/style.css";
import QuestionBox from "./components/QuestionBox";
import quizService from "./quizService";
import Result from "./components/Result";
import Description from "./components/Description";
import StartPage from "./components/StartPage";
import sound from "react-sound";
import m from "./assets/music.mp3";

class App extends Component {
  state = {
    questionBank: ["a"],
    showQuestions: false,
    showDescription: false,
    score: 0,
    start: true,
    responses: 0,
    showResult: false,
    player1: false,
    player2: false,
    player1Score: null,
    player2Score: null,
    description: {},
  };
  handleResult = () => {
    this.setState({ responses: this.state.responses + 1 });
  };
  getQuestions = () => {
    quizService().then((questions) => {
      console.log("qns", questions);
      this.setState({
        questionBank: questions[0].questions,
        description: questions[0].description,
      });
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      start: true,
      showResult: false,
      score: 0,
      responses: 0,
      showDescription: false,
      showQuestions: false,
    });

    //this.getQuestions();
    // setTimeout(() => {
    //   this.setState({ score: 0,responses: 0,showDescription: true,showQuestions: false});
    // }, 1000);
    // this.setState({ start: false,showQuestions: true,showDescription: false });
  };

  start = (p) => {
    if (p == "p1") this.setState({ player1: true, player2: false });
    else this.setState({ player1: false, player2: true });
    this.getQuestions();
    setTimeout(() => {
      this.setState({ showDescription: false, showQuestions: true });
    }, 7000);
    this.setState({ start: false, showDescription: true });
  };

  computeAnswer = (answer, correct) => {
    this.setState({ responses: this.state.responses + 1 });
    if (this.state.player1) {
      if (answer == correct) {
        this.setState({
          score: this.state.score + 1,
          player1Score: this.state.player1Score
            ? this.state.player1Score + 1
            : 1,
        });
        return true;
      } else {
        return false;
      }
    } else {
      if (answer == correct) {
        this.setState({
          score: this.state.score + 1,
          player2Score: this.state.player2Score
            ? this.state.player2Score + 1
            : 1,
        });
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    return (
      <div className="container">
        <sound
          url={m}
          playStatus={sound.status.PLAYING}
          playFromPosition={300 /* in milliseconds */}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <div className="title"> Memorizing Game</div>
        {this.state.start && (
          <StartPage
            start={this.start}
            player1Score={this.state.player1Score}
            player2Score={this.state.player2Score}
          />
        )}

        {this.state.showDescription && (
          <Description description={this.state.description} />
        )}

        {this.state.showQuestions &&
          this.state.questionBank.length > 0 &&
          this.state.responses < this.state.questionBank.length + 1 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                questions={question}
                options={answers}
                key={questionId}
                selected={(answer) => this.computeAnswer(answer, correct)}
                correct={correct}
              />
            )
          )}
        {this.state.responses == this.state.questionBank.length && (
          <button
            className="answerBtn"
            style={{ marginLeft: "50%" }}
            onClick={this.handleResult}
          >
            show results
          </button>
        )}

        {this.state.responses == this.state.questionBank.length + 1 && (
          <Result
            // start={this.start}
            score={this.state.score}
            total={this.state.questionBank.length}
            playAgain={this.playAgain}
            player1={this.state.player1}
            player2={this.state.player2}
            player1Score={this.state.player1Score}
            player2Score={this.state.player2Score}
          />
        )}
      </div>
    );
  }
}
export default App;
