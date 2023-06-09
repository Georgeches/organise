import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function New({currentUser, tasks, setTasks}){
    
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const nav = useNavigate()

    function addNewTask(e){
        e.preventDefault()
        let newTask = {
            id: tasks.length + 1,
            name: taskName,
            description: description,
            admin: currentUser.id
        }
        fetch("http://localhost:9292/addtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        setTasks([...tasks, newTask])
        nav('/home')
    }

    return(
        <div className="new-task-form">
            <form onSubmit={e=>addNewTask(e)}>
                <h2>New Task</h2>
                <input type="text" placeholder="Enter name of task" onChange={e=>setTaskName(e.target.value)} id="task-name" required/>
                <textarea placeholder="Enter task description" onChange={e=>setDescription(e.target.value)} required></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default New;