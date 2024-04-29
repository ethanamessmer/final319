import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useForm } from "react-hook-form";
import Card from "react-bootstrap/Card";


const [dataF, setDataF] = useState({});
const [viewer, setViewer] = useState(0);


function App() {
  const GoToHomePage = () => {
    setViewer((dataF.viewer = 0));
  };
  const GoToAboutPage = () => {
    setViewer((dataF.viewer = 1));
  };
  const GoToGamePage = () => {
    setViewer((dataF.viewer = 2));
  };
  const GoToAdminPage = () => {
    setViewer((dataF.viewer = 3));
  };
  //any other Views?
  const setView4 = () => {
    setViewer((dataF.viewer = 4));
  };

  //The home page for a user to either go to to the game, see some user made words and for admins to be able to access their page
  function HomePage() {

  }

  //Self explanatory
  function AboutUs() {

  }

  //The game, pretty much the same as before but hooked up to the database
  function GamePage() {

  }
  
  //Where an admin can see a full list of the words, delete and update them. 
  function AdminPage() {

  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
