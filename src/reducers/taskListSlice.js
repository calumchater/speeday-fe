import { createSlice } from "@reduxjs/toolkit";

const taskListSlice = createSlice({
    name: "taskList",
    initialState: {
        taskList: {}
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList[action.payload.id] = action.payload
        },
        deleteTask: (state, action) => {
            delete state.taskList[action.payload]
        }
    }
})


export const { addTask, deleteTask } = taskListSlice.actions;
export default taskListSlice.reducer;