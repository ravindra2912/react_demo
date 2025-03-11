import React, { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css.css"
import { useDispatch, useSelector } from "react-redux";
import { addBoard, addTask, removeBoard, removeTask } from "../front/services/redux/slices/TodoBoardsSlice";
import AddBoardModal from "./modals/AddBoardModal";
import AddTaskModal from "./modals/AddTaskModal";
import TaskDetailsModal from "./modals/TaskDetailsModal";
// import { removeFromCart } from "../services/redux/slices/CartSlice";


function Todo() {
    const todoBoards = useSelector((state) => state.todoBoards);
    const dispatch = useDispatch()
    const [boards, setBoard] = useState([]);
    const [AddBoardModalShow, setAddBoardModalShow] = useState(false);
    const [AddTaskdModalShow, setAddTaskModalShow] = useState(false);
    const [TaskDetailsModalShow, setTaskDetailsModalShow] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState('');
    const [selectedTask, setSelectedTask] = useState('');

    useEffect(() => {
        getData();
    }, [todoBoards])

    function getData() {
        setBoard(todoBoards);
    }

    function insertBoard() {
        dispatch(addBoard('TODO'));
    }

    function boardRemove(val) {
        if (window.confirm("Are you sure you want to delete this Board?")) {
            dispatch(removeBoard(val));
        }
    }


    function itemRemove(board, task) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(removeTask({ 'board': board, 'task': task }));
        }
    }




    return (

        <>
            <section className="container mt-2">
                <div className="text-center">
                    <h1>Todo List</h1>
                    <hr />
                </div>
                <div className="mb-2 text-end">
                    <button className="btn btn-primary" onClick={(e) => setAddBoardModalShow(true)}>Add Board</button>
                </div>
                <div className="row main-section">
                    {
                        boards.map((item, index) => {
                            return (

                                <div className="list-section" key={'boardlist' + index}>
                                    <div className="card list-card">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5>{item.boardName}</h5>
                                            <div>
                                                <i className="bi bi-plus btn btn-sm btn-primary" onClick={(e) => { setSelectedBoard(item.boardid), setAddTaskModalShow(true) }} >Add Task</i>
                                                <i className="bi bi-trash btn btn-sm btn-danger ms-2" onClick={(e) => boardRemove(item.boardid)} ></i>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {
                                                item.tasks.map((task, taskIndex) => {
                                                    return (
                                                        <div className="card todo-card mt-1" key={'task' + taskIndex} >
                                                            <div onClick={(e) => { setSelectedBoard(item.boardid), setSelectedTask(task.taskid), setTaskDetailsModalShow(true) }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{task.taskName}</h5>
                                                                    <p className="card-text">{task.taskdesc}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-end pe-2 pb-2">
                                                                <i className="bi bi-trash btn btn-sm btn-danger ms-2" onClick={(e) => itemRemove(item.boardid, task.taskid)} ></i>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        )
                    }

                </div>

                <AddBoardModal show={AddBoardModalShow} close={() => setAddBoardModalShow(false)} />
                <AddTaskModal show={AddTaskdModalShow} board={selectedBoard} close={() => setAddTaskModalShow(false)} />
                <TaskDetailsModal show={TaskDetailsModalShow} boardid={selectedBoard} taskid={selectedTask} setSelectedTask={(e) => setSelectedTask(e)} close={() => setTaskDetailsModalShow(false)} />
            </section>

        </>
    )
}

export default Todo;