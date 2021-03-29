import axios from 'axios'
import React, { useState } from 'react'
import {useHistory} from "react-router-dom"
function Signup() {
    const history = useHistory()
    const [signup,setSignup]=useState({
        email:"",
        password:"",
        name:""
    })
    const handleClick=()=>{
        const {email,password,name}=signup
        axios.post("http://localhost:5000/api/signup",{
            email,password,name
        }).then(
            res=>{
                if(res.error){
                    alert(res.error)
                    console.log(res.error)
                }
                else{
                    history.push("/")
                }
            }
        ).catch(err=>{
            console.log(err)
        })

    }
    return (
        <div>
           <div className="card">
            <h2>Instagram</h2>
            <input type="text" placeholder="name" onChange={(e)=>setSignup({...signup,name:e.target.value})}/>
            <input type="text" placeholder="email" onChange={(e)=>setSignup({...signup,email:e.target.value})}/>
            <input type="password" placeholder="password" onChange={(e)=>setSignup({...signup,password:e.target.value})}/>
            <button className="btn waves-effect waves-light" onClick={handleClick}>Login</button>
        </div>
        </div>
    )
}

export default Signup
