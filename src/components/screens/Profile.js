import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Profile() {
    const [data,setData]=useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/api/myPost",{headers:{
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
    return (
        <div>
            <img src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"/>
            <p>40 followers</p>
            <p>40 following</p>
            <p>40 posts</p>
            {
                data.length&&data.map((imageData,index)=>(
                    <img src={imageData.photo} key={index} className="imageProfile"/>

                ))
            }

            

        </div>
    )
}

export default Profile
