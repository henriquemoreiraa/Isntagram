export type PostImg = {
  createdAt: string;
  key: string;
  name: string;
  size: number;
  updatedAt: string;
  _id: string;
};

export type Comments = {
  post: string;
  comment: string;
  createdAt: string;
  likes: string[];
  updatedAt: string;
  user: User;
  _id: string;
}[];

export type Likes = {
  bio: string;
  name: string;
  user_img: string;
  _id: string;
}[];

export type PostsType = {
  title: string;
  createdAt: string;
  likes: Likes;
  post_img: PostImg;
  shares: Likes;
  updatedAt: string;
  user: User;
  _id: string;
}[];

export type User = {
  _id: string;
  name: string;
  email: string;
  user_img: string;
  followers: Users;
  following: Users;
  bio: string;
};

export type Users = {
  _id: string;
  name: string;
  email: string;
  user_img: string;
  followers: Users;
  following: Users;
  bio: string;
}[];
