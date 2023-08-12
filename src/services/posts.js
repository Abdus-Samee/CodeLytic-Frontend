export const getPosts = () => {
    const posts = [
        {id: 1, title: "Post 1", body: "This is the body of post 1", tags: ["tag1", "tag2"]},
        {id: 2, title: "Post 2", body: "This is the body of post 2<br/>This is the heading<br/>This is the subheading<br/>More text"},
        {id: 3, title: "Post 3", body: "This is the body of post 3", tags: ["tag1", "tag2"]},
        {id: 4, title: "Post 4", body: "This is the body of post 4", tags: ["tag1", "tag2"]},
        {id: 5, title: "Post 5", body: "This is the body of post 5", tags: ["tag1", "tag2"]},
    ]

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(posts)
        }, 1000)
    }
    )
}