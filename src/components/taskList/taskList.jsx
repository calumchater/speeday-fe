import React from "react";

import styled from 'styled-components'


const ListArea = styled.div`
  background-color: #8eb0ad;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Task = styled.div`
    display: flex;
    color: darkblue;
    max-height: 5vh;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.5rem;
    gap: 1rem;
    background-color: #fffec4;
    border-radius: 10px;
    flex: 1; /* set value of flex-grow to 1*/
    filter: drop-shadow(1px 2px 0.2rem gray);
`


export default function TaskList(tasks) {
    var tasks = [{
        taskName: "Swimming",
        startTime: "10:00",
        endTime: "11:00"
   }]

  return (
    <ListArea>
     {tasks.map((task) => (
          <Task key={task.taskName}>
            <h3>{task.taskName}</h3> 
            <p>{task.startTime} {' until '} {task.endTime}</p>
          </Task>
        ))}
    </ListArea>

  );
}

