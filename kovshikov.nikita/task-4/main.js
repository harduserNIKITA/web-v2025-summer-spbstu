
class BlogApp {
    constructor() {

        BlogUI.initElements();

        this.posts = BlogStorage.loadPosts();
        if (this.posts.length === 0) {
            this.posts = BlogStorage.generateInitialData();
            BlogStorage.savePosts(this.posts);
        }

        this.initEventHandlers();

        this.renderPosts();
    }

    initEventHandlers() {
        BlogUI.elements.addPostBtn.addEventListener('click', () => {
            BlogUI.togglePostForm();
        });

        BlogUI.elements.showStatsBtn.addEventListener('click', () => {
            BlogUI.toggleStats();
            if (!BlogUI.elements.stats.classList.contains('hidden')) {
                BlogUI.showStatistics(this.posts);
            }
        });

        BlogUI.elements.submitPostBtn.addEventListener('click', async () => {
            await this.addNewPost();
        });
    }

    async addNewPost() {
        const title = BlogUI.elements.postTitle.value.trim();
        if (!title) return;

        const tags = BlogUI.elements.postTags.value.trim()
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        const newId = this.posts.length > 0
            ? Math.max(...this.posts.map(p => p.id)) + 1
            : 1;


        await new Promise(resolve => setTimeout(resolve, 500));

        const newPost = new BlogPost(newId, title, tags);
        this.posts.push(newPost);
        BlogStorage.savePosts(this.posts);
        this.renderPosts();

        BlogUI.elements.postTitle.value = '';
        BlogUI.elements.postTags.value = '';
        BlogUI.togglePostForm();
    }


    async deletePost(postId) {

        await new Promise(resolve => setTimeout(resolve, 500));

        this.posts = this.posts.filter(post => post.id !== postId);
        BlogStorage.savePosts(this.posts);
        this.renderPosts();
    }


    async addTag(postId, tag) {

        await new Promise(resolve => setTimeout(resolve, 500));

        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.addTag(tag);
            BlogStorage.savePosts(this.posts);
            this.renderPosts();
        }
    }


    async removeTag(postId, tag) {

        await new Promise(resolve => setTimeout(resolve, 500));

        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.removeTag(tag);
            BlogStorage.savePosts(this.posts);
            this.renderPosts();
        }
    }


    async addComment(postId, author, text) {

        await new Promise(resolve => setTimeout(resolve, 500));

        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.addComment({ author, text });
            BlogStorage.savePosts(this.posts);
            this.renderPosts();
        }
    }


    renderPosts() {
        BlogUI.renderPosts(
            this.posts,
            postId => this.deletePost(postId),
            (postId, tag) => this.addTag(postId, tag),
            (postId, tag) => this.removeTag(postId, tag),
            (postId, author, text) => this.addComment(postId, author, text)
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlogApp();
});