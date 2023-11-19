## Table of Contents

- [Introduction](#introduction)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [How to Run](#how-to-run)
- [User Roles](#user-roles)
- [Website Functionality](#website-functionality)
- [Contributing](#contributing)

## Introduction

This project is a web application built using React.js for the frontend, Node.js for the backend, and MongoDB for database storage. The application supports two types of users: ADMIN and EMPLOYEE, each with different functionalities and access levels.

## Directory Structure

The repository is organized into two main folders:

- **server**: Contains the Node.js backend code.
- **client**: Houses the React.js frontend code.

## Environment Variables

Both the frontend and backend utilize environment variables for configuration. Make sure to set up the following variables:

### React.js (.env)

- `REACT_APP_API_URL`: The URL for the Node.js API. Example: `http://localhost:4000`

### Node.js (.env)

- `TOKEN_SECRET`: A secret key for JWT token generation.
- `PORT`: The port on which the Node.js server runs. Example: `4000`
- `MONGO_URL`: MongoDB connection URL.

## How to Run

1. Navigate to the **client** folder: `cd client`
2. Run the React.js app: `npm start`
3. Open a new terminal window.
4. Navigate to the **server** folder: `cd server`
5. Run the Node.js server: `npm start`

The React.js app will run on port 3000, and the Node.js server will run on port 4000.

## User Roles

- **ADMIN**: Has access to the dashboard for managing products and viewing buyer history.
- **EMPLOYEE**: Can buy products, view bought products, and interact with the buying functionality.

## Website Functionality

### Registration and Login

1. **Signup Page**: Users can register by providing a username, password, and choosing a role (Admin or Employee).
2. **Login Page**: Users can log in with their credentials. A JWT token is stored in session storage upon successful login.

### Admin Dashboard

- **/dashboard/products**: Admins can view, create, update, delete, and search products.
- **/dashboard/buyers-history**: Admins can view the history of buyers for each product.

### Employee Functionality

- **/buy-product**: Employees can drag and drop products into a box, and the total price is calculated. After clicking the "Buy" button, the selected products and their total price are saved to the database.
- **/bought-products**: Employees can view a list of all the products they have bought.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.
