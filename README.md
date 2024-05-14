# afc-app
## React Order Management App

This is a React application for managing orders. It allows users to view their total orders, browse available products, and potentially create orders (functionality not included in this example).

### Features
- Displays the total number of orders for the current user.
- Fetches and displays the total number of available products.
- Includes basic layout and user interface components.


### Installation
1. Clone this repository.
2. Install dependencies in both frontend folders: `cd backend && npm install cd ../frontend && npm install`.
3. Create a `.env` file in the backend folder.

```
.env

SERVER_PORT=
API_URL=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

NOTE: Make sure to input the details according to your DB setup, server port, url and secret.

### Usage
1. Start the development server:
    - In one terminal, run backend: `cd backend && node index.js`
    - In another terminal, run frontend: `cd frontend && npm start`
2. Access the application in your browser (http://localhost:3000/)


### Technologies
#### Frontend
- React
- React Hooks (useState, useEffect)
- Fetch API

#### Backend
- NodeJS
- Express
- Crypto
- JWT

#### Database
- MySQL

### API Endpoints 
- `/api/orders` (GET): Retrieves the orders for the current user.
- `/api/products` (GET): Retrieves all the available products.
- `/api/user` (GET): Retrieves the current user data.
- `/api/orders` (POST): Creates an order for the current user.
- `/api/products` (POST): Creates a product.
- `/api/user/login` (POST): Used for log in.
- `/api/user` (POST): Registers a user to the database.

