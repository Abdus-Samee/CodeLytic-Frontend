import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Chip, Skeleton, CircularProgress, Typography } from "@mui/material"
import { motion } from "framer-motion"


import { loadAllTags } from "../../services/course-service"
import { loadAllPosts } from "../../services/posts"

import DiscussionSkeleton from "./DiscussionSkeleton"
import transition from "../../transition"

import '../../assets/css/discussion.css'

const Discussion = ({ token }) => {
    // const { loading, error, value: posts } = useAsync(getPosts)
    const [posts, setPosts] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [searchTags, setSearchTags] = useState([])
    const [loading, setLoading] = useState(true)

    // const loading = false
    const error = false
    const navigate = useNavigate()

    useEffect(() => {
        loadAllPosts().then((res) => {
            setPosts(res)
            // console.log("Res", res)
            setLoading(false)
        }).catch(e => console.log(e))
    }, [])

    const isSearchEmpty = searchPost === '' && searchTags.length === 0

    const filteredPosts = isSearchEmpty ? posts : posts.filter((post) =>
        (post.title.toLowerCase().includes(searchPost.toLowerCase()) || searchPost === '') &&
        (searchTags.length === 0 || post.tags?.some((tag) => searchTags.includes(tag)))
    )

    const handleCreate = () => {
        navigate('/discussion/create')
    }

    const handlePostClick = (postId) => {
      navigate(`/posts/${postId}`)
    }

    const handleTagClick = (tagName) => {
        if (!searchTags.includes(tagName)){
          setSearchTags(prevTags => [...prevTags, tagName])
        }
    }

    const handleTagRemove = (tagName) => {
        setSearchTags(prevTags => prevTags.filter(tag => tag !== tagName))
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
                <input 
                    type="text" 
                    placeholder="Search for posts.."
                    value={searchPost}
                    onChange={(e) => setSearchPost(e.target.value)}
                    className="discussion-search-bar" 
                />
                {token && <Button variant="contained" size="small" color="secondary" onClick={handleCreate}>Create</Button>}
                {searchTags.length > 0 &&
                    <div className="searched-tags">{/*coming from course.css*/}
                        {searchTags.map((tagName, i) => (
                            <a key={i} onClick={() => handleTagRemove(tagName)}>
                                {tagName}
                            </a>
                        ))}
                    </div>
                }
            </div>
            <div className="discussion-content">
                {loading ? <DiscussionSkeleton /> :
                    <>
                    {filteredPosts.map((post, index) => (
                        <div key={index} className="post-card">
                            <div className="post-heading" onClick={() => handlePostClick(post.id)}>
                                <h2>{post.title}</h2>
                                <Chip label={`${post.comments.length} comments`} variant="contained" sx={{ color: '#fff', bgcolor: '#252B48', }} />
                            </div>
                            {/**<p style={{ marginBottom: '0.5vh', }}>Author Name</p>**/}
                            <div className="post-tags">
                                {post.tags?.map((tag, idx) => (
                                    <span key={idx} onClick={() => handleTagClick(tag)}>{tag}</span>
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