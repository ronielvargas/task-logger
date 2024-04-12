import { useState, useEffect } from "react";
import "./App.css";
import { Container, Button, Form } from "react-bootstrap";
import Tasks from "./Tasks.jsx";
import { v4 as uuidv4 } from 'uuid'; // UUID library for unique ID

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskType, setTaskType] = useState("");
    const [lastAdded, setLastAdded] = useState();

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));

        if (storedTasks !== null && storedTasks.length > 0) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskTitle && taskType) {
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
            };
            const currentDate = new Date().toLocaleString(undefined, options);
            const newTask = {
                id: uuidv4(), // unique identifier for each of the tasks
                title: taskTitle,
                type: taskType,
                dateTimeAdded: currentDate
            };
            setTasks([...tasks, newTask]);
            setLastAdded(currentDate);
            setTaskTitle("");
            setTaskType("");
            localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
        }
    };

    const deleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task !== taskToDelete);
        setTasks(updatedTasks);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <>
            <Container className="container">
                <h1>DEV: TASK-LOGGER</h1>
                <div className="input-group mt-5">
                    <label className="label-align">Task Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </div>
                <div className=" task-type d-flex justify-content-between mt-4">
                    <label className="label-align">Task Type:</label>
                    <Form.Check
                        className="front-end-radio"
                        inline
                        label="Front-End"
                        type="radio"
                        id="front-end"
                        name="taskType"
                        checked={taskType === "front-end"}
                        onChange={() => setTaskType("front-end")}
                    />
                    <Form.Check
                        className="back-end-radio"
                        inline
                        label="Back-End"
                        type="radio"
                        id="back-end"
                        name="taskType"
                        checked={taskType === "back-end"}
                        onChange={() => setTaskType("back-end")}
                    />
                    <Button onClick={addTask}>Add</Button>
                </div>
                <Tasks tasks={tasks} onDelete={deleteTask} lastAdded={lastAdded} />
            </Container>
        </>
    );
}

export default App;
