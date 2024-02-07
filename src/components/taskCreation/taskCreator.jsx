import React, { useState } from "react";

import styled from 'styled-components'

import { TaskAPI } from "../../api/taskAPI"


const CreatorArea = styled.div`
  background-color: #8eb0ad;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CreatorTextArea = styled.textarea`
    line-height: 30px;
    height: 60vh;
    width: 60vh;
    padding: 0px 10px;
    border: 2px;
    border-color: white;
    border-radius: 20px;
    outline: 0;
    color: white;
    font-family: 'Almarai', cursive;
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    background-color: white;
    color: gray;
    top: 30px; left: 0; bottom: 30px; right: 60px;
    background: linear-gradient(white, white 28px, #91D1D3 28px);
    background-size: 30px 30px;
    z-index: 1;
`

const TaskSubmitButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-size: 25px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;
  margin-top: 30px;
  background: #6E6D70;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
`

function TaskCreator() {

  const [taskList, setTaskList] = useState(
    []
  );

  function formatTasks(tasks) {
    let formattedTasks = [];
    tasks.split("\n").forEach(taskString => {
      if (taskString.length !== 0) {
        formattedTasks.push({
          taskName: taskString.split("from")[0],
          taskStartTime: taskString.split("from")[1].split("until")[0].trim(),
          taskEndTime: taskString.split("until")[1].trim()
        })
      }
    }
    )
    return formattedTasks;
  }

  function updateTasks(e) {
    let tasks = formatTasks(e.target.value)
    console.log(tasks)
    setTaskList(tasks)
  }

  function submitTasks(e) {
    console.log('here')
    e.preventDefault();
    if (taskList.length > 0) {
      TaskAPI.createMany(taskList)
    } else {
      console.log('You need to add some tasks')
    }
  }

  return (
    <CreatorArea>
      <CreatorTextArea onChange={updateTasks} />
      <TaskSubmitButton onClick={submitTasks}>
        Submit Tasks
      </TaskSubmitButton>
    </CreatorArea>

  );
}

export default TaskCreator;