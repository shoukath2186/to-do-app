import React, { useState, useRef } from "react";

function ToDo() {

     
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');
    const [backgroundColors, setBackgroundColors] = useState([]);
    const taskRefs = useRef([]);

    function handleInputChange(event) {
        setError('');
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            if (!task.includes(newTask)) {
                setTask(t => [...t, newTask]);
                setNewTask('');
                setBackgroundColors(colors => [...colors, '']);
            } else {
                setError('Already exists.');
            }
        } else {
            setError('Enter any values.');
        }
    }

    function deleteTask(index) {
        setTask(tasks => tasks.filter((_, i) => i !== index));
        setBackgroundColors(colors => colors.filter((_, i) => i !== index));
    }

    function taskUp(index) {
        if (index > 0) {
            const updatedTask = [...task];
            const updatedColors = [...backgroundColors];
            const tempTask = updatedTask[index];


            updatedTask[index] = updatedTask[index - 1];
            updatedTask[index - 1] = tempTask;
            const tempColor = updatedColors[index];
            updatedColors[index] = updatedColors[index - 1];
            updatedColors[index - 1] = tempColor;


            setTask(updatedTask);
            setBackgroundColors(updatedColors);
        }
    }

    function taskDown(index) {
        if (index < task.length - 1) {
            const updatedTask = [...task];
            const updatedColors = [...backgroundColors];
            const tempTask = updatedTask[index];

            updatedTask[index] = updatedTask[index + 1];
            updatedTask[index + 1] = tempTask;
            const tempColor = updatedColors[index];
            updatedColors[index] = updatedColors[index + 1];
            updatedColors[index + 1] = tempColor;
            
            setTask(updatedTask);
            setBackgroundColors(updatedColors);
        }
    }

    function taskEdit(index) {
        setNewTask(task[index]);
        setTask(tasks => tasks.filter((_, i) => i !== index));

        setBackgroundColors(colors => colors.filter((_, i) => i !== index));
    }

    function colorChange(event, index) {
        const updatedColors = [...backgroundColors];
        updatedColors[index] = event.target.checked ? 'rgb(127, 202, 147)' : 'rgb(202, 127, 127)';
        setBackgroundColors(updatedColors);
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div className="head">
                <input
                    type="text"
                    placeholder="Enter a task.."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>Add</button>
                <p>{error}</p>
            </div>

            {task.map((tasks, index) => (
                <li key={index} ref={el => taskRefs.current[index] = el} style={{ backgroundColor: backgroundColors[index] }}>
                    <input type="checkbox" onClick={(event) => colorChange(event, index)} />
                    <span className="text">{tasks}</span>
                    <button className="move-button" onClick={() => taskUp(index)}>👆</button>
                    <button className="move-button" onClick={() => taskDown(index)}>👇</button>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="edit-button" onClick={() => taskEdit(index)}>Edit</button>
                </li>
            ))}
        </div>
    );
}

export default ToDo;
