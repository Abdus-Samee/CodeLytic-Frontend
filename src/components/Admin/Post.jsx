import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, CircularProgress } from "@mui/material"

import { loadAllPosts } from "../../services/posts"

import '../../assets/css/admin.css'

const Post = ({token}) => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadAllPosts().then((data) => {
            console.log(data)
            setPosts(data)
            setLoading(false)
        }).catch((e) => console.log(e))
    }, [])

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <Container>
                    {posts.map((post, key) => (
                        <div key={key} className="admin-course">
                            <div className="admin-course-title">{post.title}</div>
                            {/**<div className="admin-course-author">{post.author}</div>**/}
                            <div>
                                {post.tags.map((tag, key) => (
                                    <div key={key}>{tag}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Container>
            }
        </>
    )
}

export default Post