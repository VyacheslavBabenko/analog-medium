module.exports = () => {
    const data = {
        users: [],
        posts: []
    }
    const n = 20;
    for (let j = n, i = 0; i < n; i++, j++) {
        data.users.push({
                id: i,
                login: `reader${i}@mail.com`,
                password: 12345,
                role: "reader"
            }),
            data.users.push({
                id: j,
                login: `writer${j}@mail.com`,
                password: 12345,
                role: "writer"
            }),
            data.posts.push({
                id: j,
                title: `Название поста ${i}`,
                description: `Текст ${i}`,
                claps: 0,
                createdAt: "2019-09-29T00:00:00.000Z",
                updateAt: "2019-09-29T00:00:00.000Z",
                userId: j
            })

    }
    return data
}