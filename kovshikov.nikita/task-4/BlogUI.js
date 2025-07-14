class BlogUI {

    static initElements() {
        this.elements = {
            postsContainer: document.getElementById('postsContainer'),
            addPostBtn: document.getElementById('addPostBtn'),
            showStatsBtn: document.getElementById('showStatsBtn'),
            postForm: document.getElementById('postForm'),
            postTitle: document.getElementById('postTitle'),
            postTags: document.getElementById('postTags'),
            submitPostBtn: document.getElementById('submitPostBtn'),
            stats: document.getElementById('stats'),
            tagsStats: document.getElementById('tagsStats'),
            commentsStats: document.getElementById('commentsStats')
        };
    }

    static renderPosts(posts, deletePostCallback, addTagCallback, removeTagCallback, addCommentCallback) {
        this.elements.postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <div class="tags" id="tags-${post.id}"></div>
                <div class="comment-count">Комментариев: ${post.commentCount}</div>
                <div class="comments" id="comments-${post.id}"></div>
                <div class="post-controls">
                    <div class="form-group">
                        <input type="text" id="tagInput-${post.id}" placeholder="Новый тег">
                        <button class="addTagBtn" data-post-id="${post.id}">Добавить тег</button>
                    </div>
                    <div class="form-group">
                        <input type="text" id="commentAuthor-${post.id}" placeholder="Ваше имя">
                        <textarea id="commentText-${post.id}" placeholder="Ваш комментарий"></textarea>
                        <button class="addCommentBtn" data-post-id="${post.id}">Добавить комментарий</button>
                    </div>
                    <button class="deletePostBtn" data-post-id="${post.id}">Удалить пост</button>
                </div>
            `;

            this.elements.postsContainer.appendChild(postCard);

            const tagsContainer = document.getElementById(`tags-${post.id}`);
            post.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.innerHTML = `
                    ${tag}
                    <button class="removeTagBtn" data-post-id="${post.id}" data-tag="${tag}">×</button>
                `;
                tagsContainer.appendChild(tagElement);
            });

            const commentsContainer = document.getElementById(`comments-${post.id}`);
            post.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text">${comment.text}</div>
                `;
                commentsContainer.appendChild(commentElement);
            });

            // Навешиваем обработчики
            document.querySelector(`.addTagBtn[data-post-id="${post.id}"]`).addEventListener('click', async () => {
                const tagInput = document.getElementById(`tagInput-${post.id}`);
                const tag = tagInput.value.trim();
                if (tag) {
                    await addTagCallback(post.id, tag);
                    tagInput.value = '';
                }
            });

            document.querySelector(`.addCommentBtn[data-post-id="${post.id}"]`).addEventListener('click', async () => {
                const author = document.getElementById(`commentAuthor-${post.id}`).value.trim();
                const text = document.getElementById(`commentText-${post.id}`).value.trim();
                if (author && text) {
                    await addCommentCallback(post.id, author, text);
                    document.getElementById(`commentAuthor-${post.id}`).value = '';
                    document.getElementById(`commentText-${post.id}`).value = '';
                }
            });

            document.querySelector(`.deletePostBtn[data-post-id="${post.id}"]`).addEventListener('click', async () => {
                await deletePostCallback(post.id);
            });

            document.querySelectorAll(`.removeTagBtn[data-post-id="${post.id}"]`).forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const tag = e.target.dataset.tag;
                    await removeTagCallback(post.id, tag);
                });
            });
        });
    }

    static showStatistics(posts) {
        const postsByTag = BlogStats.groupPostsByTag(posts);
        const uniqueTags = BlogStats.getUniqueTags(posts);
        const postsByCommentCount = BlogStats.groupPostsByCommentCount(posts);
        const allAuthors = BlogStats.getAllAuthors(posts);

        this.elements.tagsStats.innerHTML = `
            <h3>Теги (${uniqueTags.size})</h3>
            <ul>
                ${Array.from(uniqueTags).map(tag => `
                    <li>${tag} (постов: ${postsByTag.get(tag)?.length || 0})</li>
                `).join('')}
            </ul>
        `;

        this.elements.commentsStats.innerHTML = `
            <h3>Комментарии</h3>
            <p>Всего комментариев: ${posts.reduce((sum, post) => sum + post.commentCount, 0)}</p>
            <p>Уникальных авторов: ${allAuthors.length}</p>
            <h4>Посты по количеству комментариев:</h4>
            <ul>
                ${Array.from(postsByCommentCount.entries()).map(([count, posts]) => `
                    <li>${count} комментариев: ${posts.length} пост(ов)</li>
                `).join('')}
            </ul>
        `;
    }

    static togglePostForm() {
        this.elements.postForm.classList.toggle('hidden');
    }

    static toggleStats() {
        this.elements.stats.classList.toggle('hidden');
    }
}