import React, { useState } from "react";

import styled from 'styled-components'

import { TaskAPI } from "../../api/taskAPI"

import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../reducers/taskListSlice.js";

const CreatorArea = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`

const CreatorTextArea = styled.textarea`
    line-height: 30px;
    height: 60vh;
    width: 60vh;
    min-width: 40vw;
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
    cursor: pointer;
    border-radius: 20px;
    font-weight: 600;
    transition: 0.4s;
    border: 1px solid #008B8B;
    padding: 20px 30px;
    font-size: 20px;
    border-radius: 6px;
    border: none;
    margin-top: 30px;
    background: #FFFFF0;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
    color: #008B8B;

  &:hover {
    color: white; 
    width:;
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
    background-color: #008B8B;
  }
}
`
const HH_REGEX = /^([0-1]?[0-9]|2[0-3])$/
const HHMM_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

function TaskCreator() {

  let dispatch = useDispatch()
  let taskList = useSelector(state => state.taskList);



  function checkTaskErrors(taskString) {
    let errors = []
    // Task Name exist
    if (taskString.split("from")[0] == undefined || taskString.split("from")[0].length == 0) {
      errors.push("Task Name cannot be empty")
    }
    // Task contains from and until
    if (!taskString.includes("from") || !taskString.includes("until")) {
      errors.push("Task must contain from and until")
    }
    // if task contains from and until, we can check the time presece and validities
    else {
      // check startTime validity      
      if (!HH_REGEX.test(taskString.split("from")[1].split("until")[0].trim()) && !HHMM_REGEX.test(taskString.split("from")[1].split("until")[0].trim())) {
        errors.push("Invalid Start Time")
      }
      // check endTime validity
      if (!HH_REGEX.test(taskString.split("from")[1].split("until")[1].trim()) && !HHMM_REGEX.test(taskString.split("from")[1].split("until")[1].trim())) {
        errors.push("Invalid End Time")
      }
    }
    return errors
  }

  // Formats task into object that we can add to state
  function formatTask(taskString) {
    let formattedTask = {}
    let taskErrors = checkTaskErrors(taskString)
    if (taskErrors.length === 0) {
      formattedTask.task_name = taskString.split("from")[0]
      formattedTask.start_time = taskString.split("from")[1].split("until")[0].trim()
      formattedTask.end_time = taskString.split("until")[1].trim()
    }
    else {
      formattedTask.errors = taskErrors
    }
    return formattedTask;
  }

  function formatTasks(tasks) {
    let formattedTasks = [];
    tasks.split("\n").forEach(function (taskString, i) {
      // Only show the last line if it's a valid task
      if (taskString.length == 0) { return }
      if (i == tasks.split("\n").length - 1 && checkTaskErrors(taskString).length == 0) {
        formattedTasks.push(formatTask(taskString))
      } else if (i < tasks.split("\n").length - 1) {
        formattedTasks.push(formatTask(taskString))
      }
    })
    return formattedTasks;
  }

  function formatTasksBackIntoString() {
    let bigTaskString = ""
    if (taskList.taskList.length > 0) {
      taskList.taskList.forEach(function (task) {
        bigTaskString += task.taskName + " from " + task.startTime + " until " + task.endTime + "\n"
      })
    }

    return bigTaskString
  }

  // Update our taskList in state so we can display them on the other pane
  function updateTasks(e) {
    // Convert tasks from string into array of task objects
    let tasks = formatTasks(e.target.value)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    dispatch(addTask(tasks))
  }

  function submitTasks(e) {
    e.preventDefault();
    let tasks = taskList.taskList;
    console.log(tasks.length)
    if (tasks.length > 0) {
      // Set tasks in local storage in case there is a login redirect, don't want them to lose them
      TaskAPI.createMany(tasks)
    } else {
      console.log('You need to add some tasks')
    }
  }

  return (
    <CreatorArea>
      <CreatorTextArea onChange={updateTasks} defaultValue={formatTasksBackIntoString()} />

      <TaskSubmitButton onClick={(e) => submitTasks(e)}>
        Submit Tasks
      </TaskSubmitButton>
    </CreatorArea>

  );
}

export default TaskCreator;