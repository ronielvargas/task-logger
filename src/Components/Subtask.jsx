import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ProgressBar } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { TbProgress } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import './Subtask.css';

function Subtask({ task, onDelete, lastAdded }) {
    const [show, setShow] = useState(false);
    const [subtask, setSubtask] = useState("");
    const [subtasks, setSubtasks] = useState([]);

    useEffect(() => {
        const storedSubtasks = JSON.parse(localStorage.getItem(`subtask_${task.id}`));
        if (storedSubtasks !== null && storedSubtasks.length > 0) {
            setSubtasks(storedSubtasks);
        }
    }, [task.id]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddSubtask = () => {
        if (subtask.trim() !== "") {
            const newSubtask = { text: subtask, status: "default" };
            setSubtasks([...subtasks, newSubtask]);
            setSubtask("");
      
            localStorage.setItem(`subtask_${task.id}`, JSON.stringify([...subtasks, newSubtask]));
        }
    };

    const handleStatusChange = (index, status) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].status = status;
        setSubtasks(updatedSubtasks);
  
        localStorage.setItem(`subtask_${task.id}`, JSON.stringify(updatedSubtasks));
    };


    const calculateProgress = () => {
        if (subtasks.length === 0) return 0;
    
        const totalPercentage = subtasks.reduce((acc, subtask) => {
            const statusPercentageMap = {
                pending: 0,
                ongoing: 50,
                completed: 100
            };
    
            return acc + statusPercentageMap[subtask.status];
        }, 0);
    
        return (totalPercentage / subtasks.length).toFixed(0);
    };
    
    
    const renderSubtask = (subtask, index) => {
        const statusColors = {
            pending: "lightgray",
            ongoing: "yellow",
            completed: "lightgreen",
            default: "white"
        };
        
        const backgroundColor = statusColors[subtask.status] || statusColors.default;

        return (
            <div key={index} style={{ backgroundColor }} className="subtask-item">
                <p>{subtask.text}</p>
                <div>
                    <Button variant="light" onClick={() => handleStatusChange(index, "pending")}>
                        <FaRegClock />
                    </Button>{' '}
                    <Button variant="warning" onClick={() => handleStatusChange(index, "ongoing")}>
                        <TbProgress />
                    </Button>{' '}
                    <Button variant="success" onClick={() => handleStatusChange(index, "completed")}>
                        <FaCheck />
                    </Button>{' '}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Button className="m-2 w-100" onClick={handleShow}>
                {task.title}
                
                    <ProgressBar variant="dark" now={calculateProgress()} label={`${calculateProgress()}%`} />

            </Button>
            <Button className="m-2" variant="danger" onClick={() => onDelete(task)}>
                <MdDelete />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Last Added: {lastAdded}</p>
                    <div className="d-flex justify-content-between">
                    <Form.Group className="form-group" controlId="subtaskInput">
                        <Form.Control
                        type="text"
                        placeholder="Type your subtask"
                        value={subtask}
                        onChange={(e) => setSubtask(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddSubtask}>
                        Add
                    </Button>
                    </div>
                    {subtasks.map((subtask, index) => renderSubtask(subtask, index))}
                </Modal.Body>
                </Modal>
        </div>
    );
}

export default Subtask;
