import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const OtherUser = () => {
    const token = useSelector(state => state.auth.token);
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])
    let { userId } = useParams()
    useEffect(() => {
        const fetchUser = () => {
            fetch(`https://api-minireseausocial.mathis-dyk.fr/users/${userId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response
                })
                .then((response) => response.json())
                .then((response) => {
                    setUser(response)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        const fetchUserPosts = () => {
            fetch(`https://api-minireseausocial.mathis-dyk.fr/posts?user.id=${userId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response
                })
                .then((response) => response.json())
                .then((response) => {
                    setUserPosts(response)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        fetchUser()
        fetchUserPosts()
    }, [token, userId])
    return (
        <>
            <div>
                <h1>{user.username}'s profile.</h1>
                <p>name : {user.username}</p>
            </div>
        </>)
}
export default OtherUser
