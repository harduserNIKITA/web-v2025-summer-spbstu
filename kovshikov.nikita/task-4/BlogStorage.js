class BlogStorage {
    static loadPosts() {
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            const parsed = JSON.parse(savedPosts);
            return parsed.map(post => new BlogPost(
                post.id,
                post.title,
                post.tags,
                post.comments
            ));
        }
        return [];
    }

    static savePosts(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    static generateInitialData() {
        return [
            new BlogPost(1, 'Первый пост о JavaScript', ['javascript', 'web'], [
                { author: 'Алексей', text: 'Неплохой пост!' },
                { author: 'Мария', text: 'Спасибо вам за информацию' }
            ]),
            new BlogPost(2, 'Основы HTML и CSS', ['html', 'css'], [
                { author: 'Иван', text: 'В целом интересно' }
            ]),
            new BlogPost(3, 'Node.js для начинающих', ['javascript', 'node'], [
                { author: 'Алексей', text: 'Продолжайте в том же духе' },
                { author: 'Петр', text: 'Гуд джоб' },
                { author: 'Ольга', text: 'Когда будет продолжение?' }
            ])
        ];
    }
}