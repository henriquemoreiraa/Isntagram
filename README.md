# 📷 Isn'tagram

Isn'tagram is a clone of instagram, both on the front end and the back end. It's a simple social media, that the users can follow other users, like posts, comment posts, create posts, <a hrfe=''>(see all functionalities below)</a>...

## How it works

<img style="border-radius: 5px" src="./screenshots/isntagram.gif">

## Features

- Real time notification with socket.io
- Follow/unfollow users
- Search users
- Users profile
- See who the user is following
- See the user's followers
- Create post
- See your followed users posts
- See all posts
- Like post
- Comment post
- Like comment
- Share post
- Edit profile
- Change profile photo

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`JWT_SECRET`

`NODE_ENV`

## Run Locally

Clone the project

```bash
  git clone henriquemoreiraa/Isntagram
```

Go to the project directory

```bash
  cd social-media-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## 🛠️ Tech Stack

**Front-end:** React, Typescript

**Front-end libs:** Axios, reat-icons, react-router-dom, socket.io client

**Back-end:** Node, Express and MongoDB

**Back-end libs:** Bcryptjs, cors, dotenv, jsonwebtoken, mongoose, multer, socket.io
