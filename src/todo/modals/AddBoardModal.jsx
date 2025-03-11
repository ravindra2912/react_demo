import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { addBoard } from "../../front/services/redux/slices/TodoBoardsSlice";

function AddBoardModal(props) {
    const dispatch = useDispatch();
    const [boardName, setBoardName] = React.useState('');
    function insertBoard() {
        if (boardName.trim() !== '') {
            dispatch(addBoard(boardName));
            setBoardName('');
            props.close();
        } else {
            alert('Please enter board name');
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
                    Add Board
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="boardName" className="form-label">Board Name</label>
                    <input type="text" defaultValue={boardName} onChange={(e) => setBoardName(e.target.value)} className="form-control" id="boardName" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={insertBoard}>Add</Button>
                <Button onClick={props.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddBoardModal;