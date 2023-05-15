import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./source";
import { Winner } from "./winner";

function App() {
  const [user, setUser] = useState("");
  const [num, setNum] = useState("");
  const [result, setresult] = useState();
  const [guess, setGuess] = useState(0);
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);

  const Createstd = {
    display: show ? "block" : "none",
  };

  async function newGame() {
    const username = prompt("Hi Enter your name");
    setGuess(0);
    setDisable(false);
    setShow(false);
    setresult();
    setNum("");

    const response = await fetch(`${API}/user/userdetails`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: username,
      }),
    });

    const data = await response.json();

    if (data.message === "username already exist try unique gaming name") {
      alert("username already exist try unique gaming name");
    } else {
      fetch(`${API}/user/userdetails/${username}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((usr) => {
          setUser(usr.data);
        });
    }
  }
  const randomNum = user.random;

  function handlSubmit(name) {
    const userGuess = num.toString().split("");
    const result = [];

    for (let i = 0; i < userGuess.length; i++) {
      if (
        userGuess[i] === randomNum[0] ||
        userGuess[i] === randomNum[1] ||
        userGuess[i] === randomNum[2] ||
        userGuess[i] === randomNum[3]
      ) {
        if (userGuess[i] === randomNum[i]) {
          result.push("+");
        } else {
          result.push("-");
        }
      } else {
        result.push("*");
      }
    }
    if (guess >= 14) {
      setDisable(true);
    }
    if (result.every((val) => val === result[0])) {
      setShow(!show);
      setDisable(true);

      fetch(`${API}/user/userdetails/${name}`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          guess: guess + 1,
        }),
      });
    }
    return setresult(result), setGuess(guess + 1);
  }

  return (
    <div className="body">
      <h1>
        HI <span className="username">{user.name}</span> GUESS THE NUMBER
      </h1>

      <input
        required
        className="input"
        type="number"
        placeholder="Enter 4 digit number Eg-1234"
        onChange={(e) => setNum(e.target.value)}
        value={num}
      />
      <br />
      <div>
        <button
          disabled={disable}
          className="submit-button"
          onClick={() => handlSubmit(user.name)}
          type="submit"
        >
          SUBMIT
        </button>
        <button
          className="newgame-button"
          onClick={() => newGame()}
          type="submit"
        >
          START NEW GAME
        </button>
      </div>
      <div>
        <h3>Your Result = {result}</h3>

        <h3>
          No of Guesses = {guess}
          <span className="guess-left">Guess left = {15 - guess}</span>
        </h3>
        <h2 className="congrats" style={Createstd}>
          CONGRATULATIONS YOU WON....
        </h2>

        {/* <div className="winner-section">
          <Winner/>
        </div> */}
      </div>
    </div>
  );
}

export default App;
