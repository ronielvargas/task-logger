import React from "react";
import { Row, Col } from "react-bootstrap";
import Subtask from "./Subtask";

function Tasks({ tasks, onDelete, lastAdded }) {
    return (
        <>
            <Row className="mt-5 gap-5">
                <Col className="frontend-container">
                    <p>Front-End</p>
                    {tasks
                        .filter((task) => task.type === "front-end")
                        .map((task) => (
                            <Subtask key={task.id} task={task} onDelete={onDelete} lastAdded={lastAdded} />

                        ))}
                </Col>
                <Col className="backend-container">
                    <p>Back-End</p>
                    {tasks
                        .filter((task) => task.type === "back-end")
                        .map((task) => (
                            <Subtask key={task.id} task={task} onDelete={onDelete} lastAdded={lastAdded} />

                        ))}
                </Col>
            </Row>
        </>
    );
}

export default Tasks;
