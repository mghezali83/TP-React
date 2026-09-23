export interface PostReactions {
    likes: number;
    dislikes: number;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: PostReactions;
    views: number;
    userId: number;
}

export interface CommentAuthor {
    id: number;
    username: string;
    fullName?: string;
}

export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: CommentAuthor;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

export interface CommentsResponse {
    comments: Comment[];
    total: number;
    skip: number;
    limit: number;
}