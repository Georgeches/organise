import { Link,useNavigate } from "react-router-dom";

function Task({task, selectTask, currentUser}){
    const nav = useNavigate()
    function openTask(e){
        e.preventDefault()
        selectTask(task)
        nav('/taskdetail')
    }
    return(
        <>
        <div className="task" onClick={e=>openTask(e)}>
            <p>{task.description}</p>
        </div>
        <p onClick={e=>openTask(e)}>{task.name}</p>
        </>
    )
}

export default Task;