import { createSlice } from "@reduxjs/toolkit";

const taskListSlice = createSlice({
    name: "taskList",
    initialState: { // Get the task list from local storage in case the user had a login redirect and already wrote some things
        taskList: localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks'))
            : {}
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList = action.payload
        },
        deleteTask: (state, action) => {
            delete state.taskList[action.payload]
        }
    }
})


export const { addTask, deleteTask } = taskListSlice.actions;
export default taskListSlice.reducer;