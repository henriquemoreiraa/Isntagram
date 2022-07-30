export type PostImg = {
createdAt: string;
key: string;
name: string;
size: number;
updatedAt: string;
_id: string
};

export type Answers = {
answer: string;
likes: string[];
user: {
    name: string;
    user_id: string;
    user_img: string
};
_id: string;
}[]

export type Comments = {
answers: Answers;
comment: string;
createdAt: string;
likes: Likes;
updatedAt: string;
user: {
    name: string;
    user_id: string;
    user_img: string
};
_id: string;
}[]


export type Likes = {
bio: string;
name: string;
user_img: string;
_id: string;
}[]

export type Posts = {
title: string;
comments: Comments;
createdAt: string;
likes: Likes;
post_img: PostImg;
shares: string[];
tagged: string[];
updatedAt: string;
user_id: string;
_id: string; 
}[];