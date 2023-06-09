import { useState } from "react";

function TaskDetail({task, tasksusers, users, all_users, setSelectedTaskUsers, currentUser}){
    const [newUserId, setNewUserId] = useState("")

    function addUser(e){
        e.preventDefault()
        if(newUserId===""){
            alert("Please choose a user first")
        }
        else{
            let found_users = users.filter(user=>user.id===parseInt(newUserId))
            if(found_users.length === 0){
                let newTaskUserId = {
                    user: parseInt(newUserId),
                    task: task.id
                }
                fetch("http://localhost:9292/addtaskuser", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTaskUserId)
                })
                .then(res=>res.json())
                .then(data=>console.log(data))
                .catch(err=>console.log(err))
                setSelectedTaskUsers([...users, all_users.find(user=>user.id===parseInt(newUserId))])
            }
            else{
                alert("The user is already added")
            }
        }
    }

    return(
        <div className="task-detail">
            <div className="detail-header">
                <h1>{task.name}</h1>
                {task.admin===currentUser.id?
                    <div className="add-user">
                    <select onChange={e=>setNewUserId(e.target.value)}>
                        <option value="">Choose user</option>
                        {all_users.map(user=><option value={user.id}>{user.name}</option>)}
                    </select>
                    <button className="add-user-btn" onClick={e=>addUser(e)}>Add user</button>
                    </div>
                    :
                    console.log("You are not the admin")
                }
            </div>
            <div className="task-content">
            <div className="description">
                <h2>Description</h2>
                <p>{task.description}</p>
            </div>
            <div className="vl"></div>
            <div className="users">
                <h2>Users</h2>
                {users.map(user=>user.id===task.admin?
                    <div className="admin">
                        <p className="admin-name">{user.name}</p>
                        <p className="admin-tag">admin</p>
                    </div>:
                    <div>
                        <p className="user-name">{user.name}</p>
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}

export default TaskDetail;