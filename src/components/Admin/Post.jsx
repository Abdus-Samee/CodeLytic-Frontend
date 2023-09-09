import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, CircularProgress, Button } from "@mui/material"

import { loadAllPosts } from "../../services/posts"

import '../../assets/css/admin.css'

const Post = ({token}) => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        loadAllPosts().then((data) => {
            console.log(data)
            setPosts(data)
            setLoading(false)
        }).catch((e) => console.log(e))
    }, [])

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`)
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <Container>
                    <div className="admin-posts">
                        {posts.map((post, key) => (
                            <div key={key} className="admin-post">
                                <div className="admin-post-title">{post.title}</div>
                                {/**<div className="admin-course-author">{post.author}</div>**/}
                                <div className="admin-post-tags">
                                    {post.tags.map((tag, key) => (
                                        <a key={key}>{tag}</a>
                                    ))}
                                </div>
                                <hr style={{ width: '50%', marginBottom: '1vh', backgroundColor: '#FF4B2B', }} />
                                <p>{post.comments.length} comments</p>
                                <hr style={{ width: '50%', marginTop: '1vh', marginBottom: '1vh', backgroundColor: '#FF4B2B', }} />
                                <Button size="small" variant="contained" color="secondary" onClick={() => handlePostClick(post.id)}>View Post</Button>
                            </div>
                        ))}
                    </div>
                </Container>
            }
        </>
    )
}

export default Post