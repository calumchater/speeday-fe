import React from "react";
import './home.css'

import { SplitScreen } from "../layout/splitScreen";

import TaskList from "../taskList/taskList";
import TaskCreator from "../taskCreation/taskCreator";
import Auth from "../auth/auth";

import styled from "styled-components";

function Home() {

  return <div className='App'>
    <header className="App-header">
      <h1> Speeday </h1>
      <Auth className="authButtons"></Auth>
    </header>
    <SplitScreen left={TaskCreator} right={TaskList}>
    </SplitScreen>
    

  </div >;
}

export default Home;
