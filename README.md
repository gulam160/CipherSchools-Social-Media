# Social Media Backend

This project contains backend code for social media web app that enables users to create, comment, and delete the post. It incorporates user authentication, post management, and search functionality for posts using hashtags or user names.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Folder Structure](#folder-structure)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Authentication and Authorization of users.
- Create a post and the same can be deleted by user who create.
- Store posts informations, for intance: images(links), captions and hashtags.
- Retrieve all posts and the recent will come on top.
- Search the post by name of user or hashtags.

## Technologies

- TypeScript
- Node.js
- Express.js
- MongoDB (as my database)

## Getting Started

### Folder Structure

Every development files are located within the `./src` folder.

```
├── index.ts
├── connection.ts
├── controllers
│   ├── authController.ts
│   └── postController.ts
├── middleware
│   ├── authMiddleware.ts
│   └── validationMiddleware.ts
├── models
│   ├── post.modal.ts
│   └── user.modal.ts
└── routes
    ├── auth.route.ts
    └── post.route.ts
```

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (at least v14)
- MongoDB compass installed and running (or have logged in MongoDB Atlas)
- npm or yarn package manager

### Installation

Step-by-step instructions on how to set up and run the project.

1.  Clone this repository:

    ```bash
    git clone https://github.com/gulam160/CipherSchools-Social-Media.git

    ```

2.  Navigate to the project directory:

    ```bash
    cd CipherSchools-Social-Media
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Configure a few environment in a file named as `.env` as followings:

    - SERVER_PORT
    - DBURI
    - JWTSECRET

5.  Start the server:

        npm start

## Usage

- Use your preferred API client (e.g., Postman, Hoppscotch, Thunder Client) to interact with the API endpoints.

- Refer to the API Endpoints section for details on available routes and parameters.

## API Endpoints

1.  User registration:

        . Endpoint: POST /register
        . Request Body: JSON

        {
            "name": "Gulam Mustafa",
            "email": "hello.world14@mail.com",,
            "password": "password@121"
            "profilePicture": "https://myimage.jpg"
        }

2.  login User:

        . Endpoint: POST /login
        . Request Body: JSON

        {
            "email": "gulam.mu159@gmail.com",
            "password": "password@121"
        }

3.  Create a Post:

        . Endpoint: POST /posts
        . Request Body: JSON

        {
            "post_text": "Node.js with typescript",
            "image_links": ["https://example.com/image1.jpg"],
            "hashtags": ["#sample", "#post", "#example"]
        }

        . Please pass Auth token in Headers

4.  Retrieve all Post (user specific):

        . Endpoint: GET /posts
        . Request Body: NA (Please pass Auth token in Headers)

5.  Delete a post (can be done by user who created):

        . Endpoint: DELETE /posts/:{postId}
        . Request Body: NA (Please pass Auth token in Headers)

6.  Search a post by hashtag or user name:

        . Endpoint: GET /posts//posts/search
        . Request Body: NA
        . Query Params: {search : hashtag or name of user}
