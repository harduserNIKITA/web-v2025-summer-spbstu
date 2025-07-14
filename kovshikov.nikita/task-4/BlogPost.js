class BlogPost {

    constructor(id, title, tags = [], comments = []) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.comments = comments;
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    get commentCount() {
        return this.comments.length;
    }
}