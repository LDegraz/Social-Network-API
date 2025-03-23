# 📱 Social Network API

## 🧾 Description

This project is a **Social Network API** built using **Express.js**, **MongoDB**, and **Mongoose**. It allows users to create an account, share their thoughts, react to other users’ thoughts, and manage a friend list. Designed as a back-end solution for a social media platform, the API supports full CRUD operations for users and thoughts, as well as subdocument functionality for reactions and friend management.

The application uses **NoSQL** (MongoDB) to efficiently handle large amounts of unstructured data, a common requirement for modern social networking platforms.

## 📹 Walkthrough Video

🔗 [Click here to watch the walkthrough video demonstrating full functionality in Insomnia](?????????/)  

## ⚙️ Features

- Users can:
  - Create, update, and delete their profile
  - Add and remove other users as friends
  - Post, update, and delete thoughts

- Thoughts can:
  - Include timestamped reactions from other users
  - Be associated with their author's user profile
- Reactions are stored as subdocuments in Thought documents
- MongoDB connection is managed using Mongoose with schema validation and virtuals for friend and reaction counts

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Dotenv

## 📁 Folder Structure

- Social-Network-API/
    - src/
        - config/
            - config.ts
            - connections.ts
            - db.ts
        - controllers/
            - userController.ts
            - thoughtController.ts
        - models/
            - User.ts
            - Thought.ts
            - index.ts
        - routes/
            - api/
                - userRoutes.ts
                - thoughtRoutes.ts
                - index.ts
            - index.ts
        - utils/
            - formatDate.ts
        - server.ts
    - .env
    - .gitignore
    - LICENSE
    - package.json
    - tsconfig.json
    - README.md

## 🚀 Getting Started

#### Prerequisites

- Node.js
- MongoDB installed and running locally

#### Installation

1. Clone the repository:

   `git clone git@github.com:LDegraz/Social-Network-API.git`

   `cd social-network-api`

2. Install dependencies:

	`npm install`

- Create a .env file in the root with the following (optional):

	    MONGODB_URI=mongodb://localhost:27017/socialNetwork

        PORT=3001

3. Start the server:

    `npm run build`

    `node dist/server.js`

- Or for development with ts-node:

     npx ts-node src/server.ts

4. Open Insomnia or Postman and test API endpoints at:

    http://localhost:3001/api

#### API Routes

Users

- GET /api/users — Get all users

- GET /api/users/:userId — Get a single user by ID


- POST /api/users — Create a new user


- PUT /api/users/:userId — Update a user


- DELETE /api/users/:userId — Delete a user

Thoughts

- GET /api/thoughts — Get all thoughts


- GET /api/thoughts/:thoughtId — Get a single thought


- POST /api/thoughts — Create a new thought


- PUT /api/thoughts/:thoughtId — Update a thought


- DELETE /api/thoughts/:thoughtId — Delete a thought

## 📖 License

This project is licensed under the MIT License.

## ✍️ Contributors

- [Lauren DeGrazia](https://github.com/LDegraz/Social-Network-API.git)- Project Creator
- MongoDB & Mongoose documentation
- Express.js routing patterns
- Xpert Learning Assistant - The AI Learning Assistant for support and guidance throughout the bootcamp
- Lesley Vaden- T.A., providing guidance and support throughout the assignment
- Kevin Ferguson- Instructor, providing guidance and support throughout the assignment
- Lindelwe- Rutgers Bootcamp tutor 

## 📨 Contact

If you have any questions, feel free to reach out!
- **GitHub:** [LDeGraz](https://github.com/LDegraz)
- **Email:** [degrazial3@gmail.com](mailto:degrazial3@gmail.com)

#### How to Contact

You can contact me via email for any inquiries or feedback regarding this project. Alternatively, you can open an issue on GitHub if you encounter any problems or have suggestions for improvements. I will do my best to respond promptly!
