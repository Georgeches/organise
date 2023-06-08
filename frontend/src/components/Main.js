import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import Task from "./Task";

function Main({currentUser, setCurrentUser, tasks, setTasks, selectTask}){
    const nav = useNavigate()
    const [search, setSearch] = useState("")
    function hanleLogout(e){
        e.preventDefault()
        setCurrentUser({id:0})
        nav('/login')
    }
    function addTask(e){
        e.preventDefault()
        nav('/newtask')
    }
    return(
        <>
        {currentUser.id === 0
        ?
        <>
        <h1>Please Log in first</h1>
        <Link to='/'>Log in</Link>
        </>
        :
        <>
        <div className="header">
            <h2>Welcome back {currentUser.name}</h2>
            <h4 onClick={e=>hanleLogout(e)}><Link to = "/">Log out</Link></h4>
        </div>
        <div className="main-body">
            <div className="body-header">
                {tasks.length===1?<h4>You have {tasks.length} task</h4>:<h4>You have {tasks.length} tasks</h4>}
            </div>
            <div className="search-body">
                <input type="text" id="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
            </div>
            <div className="tasks-body">
                {tasks.map(thisTask=><Task task={thisTask} selectTask={selectTask} currentUser={currentUser}/>)}
                <button onClick={e=>{addTask(e)}}>add</button>
            </div>
        </div>
        </>
        }
        </>
    )
}

export default Main;