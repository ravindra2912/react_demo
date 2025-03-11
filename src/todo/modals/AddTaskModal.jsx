import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { addTask } from "../../front/services/redux/slices/TodoBoardsSlice";

function AddTaskModal(props) {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = React.useState('');
    const [taskStatus, setTaskStatus] = React.useState('');
    const [taskDesc, setTaskDesc] = React.useState('');

    function insertTask() {
        if (taskName.trim() !== '') {
            dispatch(addTask({'board': props.board, 'taskName':taskName, taskStatus:'pending', 'taskdesc':taskDesc}));
            setTaskName('');
            setTaskStatus('');
            setTaskDesc('');
            props.close();
        }
    }

    
    return (
        <Modal
            show={props.show}
            onHide={props.close}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Taks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Task Name</label>
                    <input type="text" defaultValue={taskName} onChange={(e) => setTaskName(e.target.value)} className="form-control" id="boardName" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="taskStatus" className="form-label">Task status</label>
                    <input type="text" defaultValue={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className="form-control" id="boardName" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="taskDesc" className="form-label">Description</label>
                    <input type="text" defaultValue={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} className="form-control" id="boardName" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={insertTask}>Add</Button>
                <Button onClick={props.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTaskModal;