import { createSlice } from "@reduxjs/toolkit";

const TodoBoardsSlice = createSlice({
    name: 'board',
    initialState: [{
        boardid: Math.random().toString(36).substr(2, 9),
        boardName: 'TODO', tasks: [
            {
                taskid: Math.random().toString(36).substr(2, 9),
                taskName: 'Dahboard',
                taskStatus: 'pending',
                taskdesc: 'add dashboard to the project'
            },

            {
                taskid: Math.random().toString(36).substr(2, 9),
                taskName: 'User managemet',
                taskStatus: 'Done',
                taskdesc: 'Add user management to the project'
            },
        ]
    }, { boardid: Math.random().toString(36).substr(2, 9), boardName: 'WORKING', tasks: [] }],
    // initialState: ['board1', 'board2', 'board3', 'board4', 'board5', 'board6'],
    reducers: {
        addBoard(state, action) {
            state.push({ boardid: Math.random().toString(36).substr(2, 9), boardName: action.payload, tasks: [] });
        },
        removeBoard(state, action) {
            return state.filter((item) => item.boardid !== action.payload);
        },
        addTask(state, action) {
            // console.log("Current State:", JSON.stringify(state, null, 2));
            const board = state.find((item) => item.boardid === action.payload.board);
            if (board) {
                board.tasks.push({
                    taskid: Math.random().toString(36).substr(2, 9),
                    taskName: action.payload.taskName,
                    taskStatus: action.payload.taskStatus,
                    taskdesc: action.payload.taskdesc
                });
            }
        },
        updateTask(state, action) {
            console.log("Update Task's status");
            const board = state.find((item) => item.boardid === action.payload.boardid);
            if (board) {
                const task = board.tasks.find((item) => item.taskid === action.payload.taskid);
                if (task) {
                    Object.assign(task, {
                        taskName: action.payload.taskName,
                        taskStatus: action.payload.taskStatus,
                        taskdesc: action.payload.taskdesc
                    });
                }
            }
        },
        removeTask(state, action) {
            console.log("Current State:", JSON.stringify(state, null, 2));
            const board = state.find((item) => item.boardid === action.payload.board);
            if (board) {
                board.tasks = board.tasks.filter((item) => item.taskid !== action.payload.task);
            }
        }
    }
});

export const { addBoard, removeBoard, addTask, removeTask, updateTask, moveTask } = TodoBoardsSlice.actions;
export default TodoBoardsSlice.reducer;