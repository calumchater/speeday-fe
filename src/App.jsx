import React from "react";
import './App.css'

import { SplitScreen } from "./components/layout/splitScreen";

import TaskList from "./components/taskList/taskList";
import TaskCreator from "./components/taskCreation/taskCreator";


function App() {

  return <div className='App'>
    <header className="App-header">
      <h1> Speeday </h1>
    </header>
    <SplitScreen left={TaskCreator} right={TaskList}>
    </SplitScreen>
    

  </div >;
}

export default App;
