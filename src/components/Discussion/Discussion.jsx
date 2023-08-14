import React from "react"
import { useNavigate } from "react-router-dom"
import { Container, List, ListItem, ListItemText, Chip, Button, Divider } from "@mui/material"

// import { useAsync } from "../../hooks/useAsync"
// import { getPosts } from "../../services/posts"

import "../../assets/css/discussion-post.css"

const Discussion = () => {
  // const { loading, error, value: posts } = useAsync(getPosts)
  const loading = false
  const error = false
  const navigate = useNavigate()
  
  const posts = [
    {id: 1, title: "Post 1", body: "This is the body of post 1", tags: ["tag1", "tag2"]},
    {id: 2, title: "Post 2", body: "This is the body of post 2<br/>This is the heading<br/>This is the subheading<br/>More text", tags: ["tag1", "tag2"]},
    {id: 3, title: "Post 3", body: "This is the body of post 3", tags: ["tag1", "tag2"]},
    {id: 4, title: "Post 4", body: "This is the body of post 4", tags: ["tag1", "tag2"]},
    {id: 5, title: "Post 5", body: "This is the body of post 5", tags: ["tag1", "tag2"]},
  ]

  if (loading) return <h1>Loading</h1>
  if (error) return <h1 className="error-msg">{error}</h1>

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

  return(
    <Container sx={{ marginTop: '1vh', }}>
      <Button variant="contained" size="small" color="secondary" onClick={handleCreate} style={{ marginBottom: '1vh', }}>Create</Button>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {posts.map(post => (
          <React.Fragment key={post.id}>
            <ListItem key={post.id} alignItems="center" sx={{ display: 'felx', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => handlePostClick(post.id)}>
              <ListItemText 
                primary={<h3 style={{ color: 'black', }}>{post.title}</h3>}
                secondary={
                  <>
                    {truncateText(post.body)}<br />
                    {post.tags.map(tag => (<Chip key={tag} label={tag} />))}
                  </>
                }
              />
              <Chip label="12 comments" variant="outlined" />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}

export default Discussion