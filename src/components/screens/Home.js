import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home() {
    const [data,setData]=useState([])
    const [comment,setComment]=useState("")
    useEffect(() => {
        axios.get("http://localhost:5000/api/allPost",{headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("instaCloneData")).token}` 
            }}).then(
            res=>{
                setData(res.data)
            }
        )
        .catch(
            err=>console.log(err)
        )
    }, [])
    console.log(data)

    const postLike=(postId)=>{
        console.log("like clicked")
        axios.put("http://localhost:5000/api/like",{postId},{headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("instaCloneData")).token}` 
            }}).then(
            res=>{
                const newData = data.map(item=>{
                    if(item._id===res.data._id){
                        return res.data
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }
        )
        .catch(
            err=>console.log(err)
        )
        
    }
    const postUnlike=(postId)=>{
        console.log("unlike clicked")
        axios.put("http://localhost:5000/api/unlike",{postId},{headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("instaCloneData")).token}` 
            }}).then(
            res=>{
                console.log(res)
                console.log(res,data)
                const newData = data.map(item=>{
                    if(item._id===res.data._id){
                        return res.data
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }
        )
        .catch(
            err=>console.log(err)
        )

        
    }
    console.log(data)

    const makeComment=(text,postId)=>{
        axios.put("http://localhost:5000/api/comment",{text,postId},{headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("instaCloneData")).token}` 
            }}).then(
            res=>{
                console.log(res.data)
                const newData = data.map(item=>{
                    if(item._id===res.data._id){
                        return res.data
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
                
            }
        )
        .catch(
            err=>console.log(err)
        )


    }

    return (
        <div>
            {
                data.length&&data.map(
                    (imageData,index)=>(
                        <div className="card home-card" key={index}>
                        <h5>{imageData.postedBy.name}</h5>
                        <div className="card-image">
                        <img src={imageData.photo}/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            <p>{imageData.likes.length}</p>
                            <i className="material-icons" onClick={()=>postLike(imageData._id)}>thumb_up</i>
                            <i className="material-icons" onClick={()=>postUnlike(imageData._id)}>thumb_down</i>
                            <h6>{imageData.title}</h6>
                            <p>{imageData.body}</p>
                            {
                                console.log(imageData.comments[0])
                            }
                            {
                                
                                imageData.comments.map(data=>(
                                    <div><h4>{data.postedBy.name}</h4><p>{data.text}</p></div>
                                ))
                            }
                            <input type="text" placeholder="enter comment here" onChange={(e)=>setComment(e.target.value)}/>
                            <button onClick={()=>makeComment(comment,imageData._id)}>post comment</button>
                        </div>
                            </div>

                    )
                )
            }
           
        </div>
    )
}

export default Home
