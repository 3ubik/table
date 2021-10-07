import React from "react"
import './ProfileInfo.css'

const ProfileInfo = (profileData) => {

    let data = profileData.profileData
    return (
        <div className='profile_info'>
            <h2>Profile info: </h2>
            <p>Selected Profile: {data.firstName} {data.lastName} </p>
            <p>Description:{data.description}</p>
            <p>Address: {data.adress.streetAddress}  </p>
            <p>City: {data.adress.city} </p>
            <p>State: {data.adress.state} </p>
            <p>Index: {data.adress.zip}</p>
        </div>
    )
}

export default ProfileInfo