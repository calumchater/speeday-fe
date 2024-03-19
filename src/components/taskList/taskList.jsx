import React from "react";

import styled from 'styled-components'

import { useSelector } from "react-redux";

const ListArea = styled.div`
  max-height: 80vh;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  row-gap: 20px;
`

const TaskCard = styled.div`
    display: flex;
    align-items: center;
    color: darkblue;
    max-height: 10vh;
    max-with: 70vh;
    min-width: 50vh;
    background: rgb(156,209,213);
    background: linear-gradient(0deg, rgba(156,209,213,1) 0%, rgba(157,208,211,0.7329132336528361) 5%, rgba(158,206,209,1) 10%);     border-radius: 10px;
    filter: drop-shadow(1px 2px 0.2rem gray);
    justify-content: flex-start;
`

const TimeInfo = styled.div`
  color: darkblue;
  margin: 1vw;
  font-size: 23px;

`

const TaskInfo = styled.p`
  color: black;
  font-style: bold;
  font-size: 20px;
`

function Task({ task }) {
  if (Object.keys(task).includes("errors")) {
    return (
      <TaskCard>
        <h4>{task.errors}</h4>
      </TaskCard>

    )
  }
  else {
    return (
      <TaskCard>
        <TimeInfo>{task.startTime} {' until '} {task.endTime}</TimeInfo> <TaskInfo>{task.taskName}</TaskInfo>

      </TaskCard>
    )
  }
}


export default function TaskList() {
  let state = useSelector(state => state.taskList)

  let tasks = state.taskList;

  if (tasks.length > 0) {
    return (
      <ListArea>
        {tasks.map(function (task, index) { return <Task key={task.taskName} task={task} /> })}
      </ListArea>

    );
  } else {
    return (
      <ListArea>
        <h3>Get writing</h3>
      </ListArea>
    );
  }
} 