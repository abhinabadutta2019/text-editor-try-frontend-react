# Text Editor Try

## Overview

Text Editor Try is a simple collaborative text editor application built with Node.js, Express, Socket.io, React, and MongoDB. It allows multiple users to collaborate in real-time on editing text documents.

## Features

- Real-time collaborative editing: Users can collaborate in real-time on editing text documents.
- User authentication: Users can sign up and log in to access the application.
- Secure authentication: User authentication is implemented securely using JSON Web Tokens (JWT).
- MongoDB integration: Documents are stored in a MongoDB database for persistence.
- Socket.io integration: Real-time communication between clients and the server is achieved using Socket.io.

## Getting Started

To run the application locally:

1. Clone the frontend repository: [text-editor-try-frontend-react](https://github.com/abhinabadutta2019/text-editor-try-frontend-react)
2. Clone the backend repository: [text-editor-try-backend-node](https://github.com/abhinabadutta2019/text-editor-try-backend-node)
3. Install dependencies for both the frontend and backend by running `npm install`.
4. Start the backend server by running `npm start` in the `text-editor-try-backend-node` directory. The server will start on port 3003.
5. Start the frontend development server by running `npm start` in the `text-editor-try-frontend-react` directory. The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Technologies Used

- Node.js
- Express.js
- Socket.io
- React
- MongoDB
- JSON Web Tokens (JWT)
