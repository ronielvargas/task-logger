import React from "react";
import { Row, Col } from "react-bootstrap";
import Subtask from "./Subtask";

function Tasks({ tasks, onDelete, lastAdded }) {
    return (
        <>
            <Row className="mt-5 gap-5">
                <Col className="frontend-container">
                    <p>Front-End</p>
                    {tasks && tasks
                        .filter((task) => task.type === "front-end")
                        .map((task) => (
                            <Subtask key={task.id} task={task} onDelete={onDelete} lastAdded={lastAdded} />
                        ))}
                    {!tasks || (tasks && tasks.filter((task) => task.type === "front-end").length === 0) && <h5>No task available.</h5>}
                </Col>
                <Col className="backend-container">
                    <p>Back-End</p>
                    {tasks && tasks
                        .filter((task) => task.type === "back-end")
                        .map((task) => (
                            <Subtask key={task.id} task={task} onDelete={onDelete} lastAdded={lastAdded} />
                        ))}
                    {!tasks || (tasks && tasks.filter((task) => task.type === "back-end").length === 0) && <h5>No task available.</h5>}
                </Col>
            </Row>
        </>
    );
}

export default Tasks;
