export const getPosts = () => {
    const posts = [
        {id: 1, title: "Post 1", body: "This is the body of post 1"},
        {id: 2, title: "Post 2", body: "This is the body of post 2"},
        {id: 3, title: "Post 3", body: "This is the body of post 3"},
        {id: 4, title: "Post 4", body: "This is the body of post 4"},
        {id: 5, title: "Post 5", body: "This is the body of post 5"},
    ]

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(posts)
        }, 1000)
    }
    )
}