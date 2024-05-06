import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useForm } from "react-hook-form";
//import Card from "react-bootstrap/Card";
import hangman0 from "./images/hangman-0.svg";
import hangman1 from "./images/hangman-1.svg";
import hangman2 from "./images/hangman-2.svg";
import hangman3 from "./images/hangman-3.svg";
import hangman4 from "./images/hangman-4.svg";
import hangman5 from "./images/hangman-5.svg";
import hangman6 from "./images/hangman-6.svg";
import loss from "./images/lost.gif";
import victory from "./images/victory.gif";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function App() {
  let count = 0;

  let number_of_words = 50; //initialized upon loading the website
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  const [hangman, setHangman] = useState(0);
  const [hangmanImage, setHangmanImage] = useState(hangman0);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState({
    id: 0,
    word: "",
    hint: "",
  });
  const [wordState, setWordState] = useState("");
  const [wordList, setWordList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [canWin, setcanWin] = useState(true);

  const createList = () => {};
  const GoToAboutPage = () => {
    setViewer((dataF.viewer = 1));
    console.log(dataF.viewer);
    setFirstLoad(true);
  };
  const GoToGamePage = () => {
    setViewer((dataF.viewer = 2));
    setHangman((dataF.hangman = 0));
    setHangmanImage((dataF.hangmanImage = hangman0));
    let rand = Math.floor(Math.random() * number_of_words);
    setWord((dataF.word = words[rand]));
    let temp = "";
    for (let i = 0; i < dataF.word.word.toString().length; i++) {
      temp += "-";
    }
    setWordState((dataF.wordState = temp));
    setFirstLoad(true);
    setcanWin(true);
    console.log(dataF.word.word);
    console.log(dataF.viewer);
    console.log(dataF.hangman);
  };
  const WrongGuess = () => {
    setHangman(dataF.hangman++);
    console.log(dataF.hangman);
    if (dataF.hangman === 0) {
      setHangmanImage((dataF.hangmanImage = hangman0));
    } else if (dataF.hangman === 1) {
      setHangmanImage((dataF.hangmanImage = hangman1));
    } else if (dataF.hangman === 2) {
      setHangmanImage((dataF.hangmanImage = hangman2));
    } else if (dataF.hangman === 3) {
      setHangmanImage((dataF.hangmanImage = hangman3));
    } else if (dataF.hangman === 4) {
      setHangmanImage((dataF.hangmanImage = hangman4));
    } else if (dataF.hangman === 5) {
      setHangmanImage((dataF.hangmanImage = hangman5));
    } else if (dataF.hangman === 6) {
      setHangmanImage((dataF.hangmanImage = hangman6));
    } else {
      setcanWin(false);
      setHangmanImage((dataF.setHangmanImage = loss));
      setWordState("Sorry, the word was " + word.word)
    }
  };

  const GoToAdminPage = () => {
    setViewer((dataF.viewer = 3));
    console.log(viewer);
    setFirstLoad(true);
  };
  //any other Views?
  const GoToHomePage = () => {
    setViewer((dataF.viewer = 0));
    console.log(viewer);
  };

  function wordSubmit(e){
    e.preventDefault();
    const form = document.querySelector("#wordsubmit");
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    fetch("http://localhost:8081/addWord", {method: form.method, mode: "cors", body: JSON.stringify({
      "id": number_of_words+1,
      "word": formData.get("word"),
      "hint": formData.get("hint")
    }),
    headers: {"Content-Type" : "application/json"
    }});

    fetch("http://localhost:8081/listWords")
        .then((response) => response.json())
        .then((myItems) => {
          number_of_words = myItems.length;
        });
  }

  function StartingPage() {
    return (
      <div className="Start">
        <button onClick={() => GoToHomePage()}>start</button>
      </div>
    )
  }

  //The home page for a user to either go to to the game, see some user made words and for admins to be able to access their page
  function HomePage() {
    if (firstLoad) {
      console.log(firstLoad);
      setFirstLoad(false);
      GetAll();
    }
    console.log(firstLoad);
    function GetAll() {
      console.log("Made it to fetch");
      fetch("http://localhost:8081/listWords")
        .then((response) => response.json())
        .then((myItems) => {
          console.log(myItems);
          number_of_words = myItems.length;
          console.log(number_of_words);
          setWords(myItems);
          listWords(myItems);
        });
      function listWords(words) {
        let wordList = new Array(10);
        for (let i = 0; i < 10; i++) {
          let rand = Math.floor(Math.random() * number_of_words);
          wordList[i] = words[rand].hint + "\n\n";
        }
        setWordList(wordList);
      }
    }

    return (
      <div>
        <center>
          <header>
            <h1 style={{ color: "white" }}>
              <a href="#" style={{ color: "white" }}>
                Hangman
              </a>
              <br />
            </h1>
            <div className="NavBar">
              <nav>
                <li>
                  <button onClick={() => GoToHomePage()}>Home</button>
                </li>
                <li>
                  <button onClick={() => GoToAboutPage()}>About US</button>
                </li>
                <li>
                  <button onClick={() => GoToGamePage()}>Go To Game</button>
                </li>
                <li>
                  <button onClick={() => GoToAdminPage()}>For Admins</button>
                </li>
              </nav>
            </div>
          </header>
        </center>
        <div>
          <h1>The Home Page</h1>

        </div>
        <div class="flexbox-container">

          <div>
            <div className = "List" style = {{ border : 5, borderColor: "white", borderStyle : "solid"}}> {/*The left side list of hints */}
            <h2 style={{color:"white"}}><pre>{wordList}</pre></h2>
            <button onClick={() => GetAll() }>Load Words</button>
          </div>

          </div>
          <div class="submit-word">
            <form id="wordsubmit" method="post" onSubmit={wordSubmit}>
              <h1 style={{color:"white"}}>Submit a Word</h1>
              <label>Word: <input type="text" name="word"></input></label>
              <br></br>
              <label>Hint: <input type="text" name="hint"></input></label>
              <br></br>
              <button>Submit!</button>
            </form>
          </div>
          
        </div>
      </div>
    );
  }

  //Self explanatory
  function AboutUs() {
    return (
      <div>
        <center>
          <header>
            <h1 style={{ color: "white" }}>
              <a href="#" style={{ color: "white" }}>
                Hangman
              </a>
              <br />
            </h1>
            <div className="NavBar">
              <nav>
                <li>
                  <button onClick={() => GoToHomePage()}>Home</button>
                </li>
                <li>
                  <button onClick={() => GoToAboutPage()}>About US</button>
                </li>
                <li>
                  <button onClick={() => GoToGamePage()}>Go To Game</button>
                </li>
                <li>
                  <button onClick={() => GoToAdminPage()}>For Admins</button>
                </li>
              </nav>
            </div>
          </header>
          <div style={{ color: "white" }}>
            <h2 className="Title">SE/COMS 319</h2>
            <p>5/3/2024, Professor Aldaco</p>
            <p style={{ marginLeft: "5.5rem", marginRight: "5.5rem" }}>
              <br />
              For our final project, we embarked on an ambitious endeavor to
              expand upon the foundations laid during our midterm project.
              Recognizing the importance of implementing CRUDL operations
              (Create, Read, Update, Delete, and List) in a real-world
              application, we decided to enhance the functionality of our
              existing Hangman game. Building upon the basic game mechanics, we
              sought to create a more immersive and engaging experience by
              allowing users to contribute their own words and hints to the game
              database. This decision stemmed from our belief that
              user-generated content would not only enrich the gameplay but also
              foster a sense of community and ownership among the players.
              Furthermore, we aimed to empower administrators with the ability
              to manage the game's content effectively, including the ability to
              edit and delete user-submitted words and hints. We used a single
              page system with viewer parsing between them in a react program.
              The database is bassed in Mongo and we used node and express to
              receive the information. For future improvements, we could add user 
              sign up and login, And then have words be cited to a user. We also 
              could make it so that the words could be reported and then sent into a 
              connected repository, although then we would probably have to switch to MySQL.
              And we could add a leaderboard of some sort for number of words solved.
            </p>
            <br />
            <br />
            <h2 className="Title">Team 102</h2>
            <br />
            <br />
            <h2 className="Title">Ethan Messmer (emessmer@iastate.edu)</h2>
            <p>Made the game page, about page and part of the home page</p>
            <br />
            <h2 className="Title">Benjamin Johll (bdjohll@iastate.edu)</h2>
            <p></p>
            
          </div>
        </center>
      </div>
    );
  }

  //The game, pretty much the same as before but hooked up to the database
  function GamePage() {
    function Guess(letter, button) {
      //button.disabled = true;
      if (word.word.includes(letter) && canWin == true) {
        console.log("Successful Guess");
        let wordStatus = wordState.split("");
        let i = 0;
        word.word.split("").forEach((char) => {
          if (char === letter) {
            wordStatus[i] = letter;
          }
          i++;
        });

        setWordState(wordStatus.join(""));
        if (!wordStatus.includes("-") && count < 1 && canWin == true) {
          setHangmanImage(victory);
          setWordState(word.word + "\n\r CONGRATULATIONS you solved it");
          count += 10;
        }
      } else {
        WrongGuess();
      }
    }

    return (
      <div>
        <center>
          <header>
            <h1 style={{ color: "white" }}>
              <a href="#" style={{ color: "white" }}>
                Hangman
              </a>
              <br />
            </h1>
            <div className="NavBar">
              <nav>
                <li>
                  <button onClick={() => GoToHomePage()}>Home</button>
                </li>
                <li>
                  <button onClick={() => GoToAboutPage()}>About US</button>
                </li>
                <li>
                  <button onClick={() => GoToGamePage()}>Go To Game</button>
                </li>
                <li>
                  <button onClick={() => GoToAdminPage()}>For Admins</button>
                </li>
              </nav>
            </div>
          </header>
          <p style={{ color: "white" }}>
            <br />
            Figure out the hidden word!
            <br />
            <br />
            Hint:
            <br />
            {word.hint}
            <br />
            <br />
          </p>

          <div className="hangman-box">
            <img src={hangmanImage} draggable={false} alt={"hangmanState"} />

            <div>
              <br />
              <br />
              <div
                className="word"
                style={{ marginLeft: 280, marginRight: 280 }}
              >
                {wordState.toUpperCase()}
              </div>
              <br />
            </div>
          </div>
          <div className="keyboard">
            <button onClick={() => Guess("a")}>a</button>
            <button onClick={() => Guess("b")}>b</button>
            <button onClick={() => Guess("c")}>c</button>
            <button onClick={() => Guess("d")}>d</button>
            <button onClick={() => Guess("e")}>e</button>
            <button onClick={() => Guess("f")}>f</button>
            <button onClick={() => Guess("g")}>g</button>
            <button onClick={() => Guess("h")}>h</button>
            <button onClick={() => Guess("i")}>i</button>
            <button onClick={() => Guess("j")}>j</button>
            <button onClick={() => Guess("k")}>k</button>
            <button onClick={() => Guess("l")}>l</button>
            <button onClick={() => Guess("m")}>m</button>
            <button onClick={() => Guess("n")}>n</button>
            <button onClick={() => Guess("o")}>o</button>
            <button onClick={() => Guess("p")}>p</button>
            <button onClick={() => Guess("q")}>q</button>
            <button onClick={() => Guess("r")}>r</button>
            <button onClick={() => Guess("s")}>s</button>
            <button onClick={() => Guess("t")}>t</button>
            <button onClick={() => Guess("u")}>u</button>
            <button onClick={() => Guess("v")}>v</button>
            <button onClick={() => Guess("w")}>w</button>
            <button onClick={() => Guess("x")}>x</button>
            <button onClick={() => Guess("y")}>y</button>
            <button onClick={() => Guess("z")}>z</button>
            <br />
            <button
              style={{ width: 500, marginTop: 20 }}
              onClick={() => GoToGamePage()}
            >
              Play Again
            </button>
          </div>
        </center>
      </div>
    );
  }

  //Where an admin can see a full list of the words, delete and update them.
  function AdminPage() {
    AdminWords();

    function AdminWords(){
      fetch("http://localhost:8081/listWords")
      .then((response) => response.json())
      .then((myItems) => {
        console.log(myItems);
        number_of_words = myItems.length;
        console.log(number_of_words);
        let modlist = document.getElementById("modlist");
        for(let i=0; i<number_of_words; i++){
          var wordcard = document.createElement("div");
          wordcard.class = "wordcard";
          var wcWord = document.createElement("h2");
          wcWord.innerHTML = myItems[i].word;
          wordcard.appendChild(wcWord);
          modlist.appendChild(wordcard);
        }
      });
    }
    return (
      <div>
        <center>
          <header>
            <h1 style={{ color: "white" }}>
              <a href="#" style={{ color: "white" }}>
                Hangman
              </a>
              <br />
            </h1>
            <div className="NavBar">
              <nav>
                <li>
                  <button onClick={() => GoToHomePage()}>Home</button>
                </li>
                <li>
                  <button onClick={() => GoToAboutPage()}>About US</button>
                </li>
                <li>
                  <button onClick={() => GoToGamePage()}>Go To Game</button>
                </li>
                <li>
                  <button onClick={() => GoToAdminPage()}>For Admins</button>
                </li>
              </nav>
            </div>
          </header>
        </center>
        <p>The Admin Page</p>
        <div class="flexbox-container" id="modlist" style={{flexDirection: "column"}}></div>
      </div>
    );
  }

  return (
    <div>
      {viewer === 0 && <HomePage />}
      {viewer === 1 && <AboutUs />}
      {viewer === 2 && <GamePage />}
      {viewer === 3 && <AdminPage />}
    </div>
  );
}

export default App;
