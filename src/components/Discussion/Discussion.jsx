import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Chip, Skeleton, CircularProgress, Typography } from "@mui/material"
import { motion } from "framer-motion"


import { loadAllTags } from "../../services/course-service"
import { loadAllPosts } from "../../services/posts"

import PostSkeleton from "./PostSkeleton"
import transition from "../../transition"

import '../../assets/css/discussion.css'

const Discussion = ({ token }) => {
    // const { loading, error, value: posts } = useAsync(getPosts)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    // const loading = false
    const error = false
    const navigate = useNavigate()

    // const posts = [
    //     {id: 1, title: "Post 1", body: "This is the body of post 1", tags: ["tag1", "tag2"]},
    //     {id: 2, title: "Post 2", body: "This is the body of post 2<br/>This is the heading<br/>This is the subheading<br/>More text", tags: ["tag1", "tag2"]},
    //     {id: 3, title: "Post 3", body: "This is the body of post 3", tags: ["tag1", "tag2"]},
    //     {id: 4, title: "Post 4", body: "This is the body of post 4", tags: ["tag1", "tag2"]},
    //     {id: 5, title: "Post 5", body: "This is the body of post 5", tags: ["tag1", "tag2"]},
    // ]

    useEffect(() => {
        loadAllPosts().then((res) => {
            setPosts(res)
            setLoading(false)
        }).catch(e => console.log(e))
        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }
        loadAllTags(customHeaders).then((res) => {
            console.log(res)
        }).catch(e => console.log(e))
    }, [])

    // if (loading) return <h1>Loading</h1>
    // if (error) return <h1 className="error-msg">{error}</h1>

    const handleCreate = () => {
        navigate('/discussion/create')
    }

    const handlePostClick = (postId) => {
      navigate(`/posts/${postId}`)
    }

    const truncateText = (text, length=50) => {
        if (text.length <= length) {
          return text;
        }
      
        return text.substr(0, length) + '\u2026'
    }

    return (
        <motion.div className="discussion-container" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1}}>
            <div className="discussion-sidebar">
                <input type="text" placeholder="Search for tags.." className="discussion-search-bar" />
                {token && <Button variant="contained" size="small" color="secondary" onClick={handleCreate}>Create</Button>}
            </div>
            <div className="discussion-content">
                {loading ? <PostSkeleton /> :
                    <>
                    {posts.map((post, index) => (
                        <div key={index} className="post-card">
                            <div className="post-heading" onClick={() => handlePostClick(post.id)}>
                                <h2>{post.title}</h2>
                                <Chip label={`${post.comments.length} comments`} variant="contained" sx={{ color: '#fff', bgcolor: '#252B48', }} />
                            </div>
                            <p style={{ marginBottom: '0.5vh', }}>Author Name</p>
                            <div className="post-tags">
                                {post.tags.map((tag, idx) => (
                                    <span key={idx} onClick={() => console.log(tag)}>{tag.name}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    </>
                }
            </div>
        </motion.div>
    )
}

export default Discussion