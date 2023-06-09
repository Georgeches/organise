import { useState, useEffect } from "react"
import { Link,useNavigate } from "react-router-dom";

function Login({setCurrentUser, currentUser, users}){

    const [username, setName] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    function handleLogin(e){
        e.preventDefault();
        let activeUser = users.find(user=>user.name===username && user.password===password)
        if (activeUser){
            setCurrentUser(activeUser)
            alert("Successfully logged in")
            nav('/home')
        }
        else{
            alert("wrong username or password")
        }
    }
    return(
        <div className="login">
            <form onSubmit={(e)=>handleLogin(e)}>
                <h1>Log in</h1>
                <input type="text" name="username" placeholder="Enter your username" id="username" onChange={e=>setName(e.target.value)} required/>
                <input type="password" name="password" placeholder="Enter your password" id="password" onChange={e=>setPassword(e.target.value)} required/>
                <button type="submit">Log in</button>
                <p>Already have an account?</p><Link to="/signup">Sign up</Link>
            </form>
        </div>
    )
}

export  default Login;