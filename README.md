# Next.js User API Boilerplate

A **Next.js** boilerplate for building a robust User API that connects a **Next.js** server to a **MongoDB** cluster and authenticates API requests using **JWT**. This project serves as a ready-to-go template to speed up your application development.

---

## Features

- **Next.js API Routes**: Effortlessly build server-side logic within your Next.js application.
- **MongoDB Integration**: Seamlessly connect to a MongoDB cluster for efficient data management.
- **JWT Authentication**: Secure API endpoints with token-based authentication.
- **Scalable Boilerplate**: A structured and modular design for rapid application development.
- **Error Handling**: Centralized and consistent error management for clean code.

---

## Tech Stack

- **Next.js**: The React framework for production.
- **MongoDB**: A NoSQL database for flexible and scalable storage.
- **Mongoose**: A MongoDB object modeling tool for elegant and structured data management.
- **JWT (jsonwebtoken)**: Token-based authentication for secure APIs.
- **Bcrypt**: For hashing and securing user passwords.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-user-api.git
cd nextjs-user-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```env
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
JWT_EXPIRES_IN=<Expiration Time, e.g., 7d>
```

### 4. Run the Development Server

```bash
npm run dev
```

Your server will be running at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```plaintext
📦nextjs-user-api
├── 📂models
│   ├── User.js            # Mongoose schema for User
├── 📂pages
│   ├── 📂api
│       ├── auth
│           ├── login.js   # Login API endpoint
│           ├── register.js # Register API endpoint
├── 📂middleware
│   ├── authMiddleware.js  # Middleware to verify JWT
├── 📂utils
│   ├── dbConnect.js       # MongoDB connection utility
├── .env.local             # Environment variables
├── package.json           # Project dependencies
```

---

## API Endpoints

### 1. **Register User**

`POST /api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully!"
}
```

### 2. **Login User**

`POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "token": "your.jwt.token"
}
```

---

## How It Works

1. **User Registration:** User details are stored in MongoDB after password hashing with Bcrypt.
2. **Login:** Generates a JWT upon successful login, which can be used for authentication.
3. **JWT Validation:** Middleware verifies JWT on protected routes.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to improve this boilerplate.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Questions or Feedback?

Feel free to reach out by opening an issue.

Happy coding! 🎉

