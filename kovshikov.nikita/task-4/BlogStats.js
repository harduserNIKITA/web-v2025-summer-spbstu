class BlogStats {

    static groupPostsByTag(posts) {
        const postsByTag = new Map();
        posts.forEach(post => {
            post.tags.forEach(tag => {
                if (!postsByTag.has(tag)) {
                    postsByTag.set(tag, []);
                }
                postsByTag.get(tag).push(post);
            });
        });
        return postsByTag;
    }

    static getUniqueTags(posts) {
        const uniqueTags = new Set();
        posts.forEach(post => {
            post.tags.forEach(tag => uniqueTags.add(tag));
        });
        return uniqueTags;
    }

    static groupPostsByCommentCount(posts) {
        const postsByCommentCount = new Map();
        posts.forEach(post => {
            const count = post.commentCount;
            if (!postsByCommentCount.has(count)) {
                postsByCommentCount.set(count, []);
            }
            postsByCommentCount.get(count).push(post);
        });
        return postsByCommentCount;
    }

    static getPostsByTag(posts, tag) {
        return posts.filter(post => post.tags.includes(tag));
    }

    static getAllAuthors(posts) {
        const authors = new Set();
        posts.forEach(post => {
            post.comments.forEach(comment => authors.add(comment.author));
        });
        return Array.from(authors);
    }
}