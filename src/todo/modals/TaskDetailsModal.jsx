import React, { use, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask } from "../../front/services/redux/slices/TodoBoardsSlice";

const emptyTask = { 'boardid': '', 'taskid': '', 'taskName': '', 'taskStatus': '', 'taskdesc': '' };

function TaskDetailsModal(props) {
    const dispatch = useDispatch();
    const todoBoards = useSelector((state) => state.todoBoards);
    const [taskDetails, setTaskDetails] = React.useState(emptyTask);

    useEffect(() => {
        console.log("TaskDetailsModal: ", props.show, props.taskid, props.boardid);
       
        if (props.show && props.taskid !== '' && props.boardid !== '') {
            const board = todoBoards.find((item) => item.boardid === props.boardid);
            const task = board.tasks.find((item) => item.taskid === props.taskid);
            setTaskDetails(prevState => ({
                ...prevState,
                boardid: props.boardid,
                taskid: props.taskid,
                taskName: task.taskName,
                taskStatus: task.taskStatus,
                taskdesc: task.taskdesc
            }));
        }
    }, [props.taskid, props.boardid]);


    function TaskUpdate() {
        dispatch(updateTask(taskDetails));
        reset();
    }

    function formHandler(e) {
        setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
    }

    function moveToanotherBoard(toBoardId) {
        console.log("Move to another board: ", toBoardId);
        dispatch(removeTask({ 'board': props.boardid, 'task': props.taskid }));
        dispatch(addTask({'board': toBoardId, 'taskName': taskDetails.taskName, 'taskStatus': taskDetails.taskStatus, 'taskdesc': taskDetails.taskdesc}));
        reset()
    }

    function reset() {
        setTaskDetails(emptyTask);
        props.setSelectedTask('');
        props.close()
    }


    return (
        <Modal
            show={props.show}
            onHide={() => reset()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="taskName" className="form-label">Task Name</label>
                            <input type="text" name="taskName" id="taskName" defaultValue={taskDetails.taskName} onChange={(e) => formHandler(e)} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="taskStatus" className="form-label">Task status</label>
                            <input type="text" name="taskStatus" id="taskStatus" defaultValue={taskDetails.taskStatus} onChange={(e) => formHandler(e)} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="taskDesc" className="form-label">Description</label>
                            <input type="text" name="taskdesc" id="taskdesc" defaultValue={taskDetails.taskdesc} onChange={(e) => formHandler(e)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="taskStatus">Board</label>
                            <select className="form-select" name="taskStatus" onChange={(e)=>moveToanotherBoard(e.target.value)} id="taskStatus">
                                {
                                    todoBoards.map((item, index) => {
                                        return <option key={'board' + index} selected={taskDetails.boardid == item.boardid?true:false} value={item.boardid}>{item.boardName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => TaskUpdate()}>Add</Button>
                <Button onClick={() => reset()}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskDetailsModal;