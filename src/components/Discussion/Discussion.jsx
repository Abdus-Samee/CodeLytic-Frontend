import { Link } from "react-router-dom"
// import { useAsync } from "../../hooks/useAsync"
// import { getPosts } from "../../services/posts"

import "../../assets/css/discussion-post.css"

const Discussion = () => {
  // const { loading, error, value: posts } = useAsync(getPosts)
  const loading = false
  const error = false
  
  const posts = [
    {id: 1, title: "Post 1", body: "This is the body of post 1"},
    {id: 2, title: "Post 2", body: "This is the body of post 2"},
    {id: 3, title: "Post 3", body: "This is the body of post 3"},
    {id: 4, title: "Post 4", body: "This is the body of post 4"},
    {id: 5, title: "Post 5", body: "This is the body of post 5"},
  ]

  if (loading) return <h1>Loading</h1>
  if (error) return <h1 className="error-msg">{error}</h1>

  return posts.map(post => {
    return (
      <h1 key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h1>
    )
  })
}

export default Discussion