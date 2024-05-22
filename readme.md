# Flat Sharing Application

Flat Sharing Application backend, powered by Node.js, TypeScript, Express, Prisma, and PostgreSQL, enables users to create accounts, book flats, and view listings seamlessly.

<!-- ## Table of Contents
- [HealthCare Backend](#healthcare-server)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation and Setup](#installation-and-setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license) -->

## Technologies Used
- **Node.js**: Runtime environment for executing JavaScript code.
- **Express.js**: Web application framework for building APIs and handling HTTP requests.
- **Prisma**: ORM (Object-Relational Mapping) tool for database management.
- **PostgreSQL**: Relational database management system.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **bcrypt**: Library for hashing passwords.
<!-- - **WEB RTC (Agora.io)**: Third-party service for real-time communication between users. -->
<!-- - **nodemailer**: Library for sending email notifications. -->

## Features
- **User Authentication and Authorization**: Secure authentication using JWT tokens.
- **User Account Creation**: allows users to create accounts securely, providing them with personalized access to the application's features.
- **Flat Booking**: Users can browse through available flats and book their desired accommodation directly through the application.
- **Flat Listing**: Landlords or property managers can list available flats, providing detailed information.

## Installation and Setup
1. Clone this repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Set up the environment variables by creating a `.env` file and filling in the required variables based on the provided `.env.example` file.
4. Run the database migrations: `npx prisma migrate dev`
5. Start the server: `npm run dev`

### Live Server URL: https://flat-sharing-server-seven.vercel.app/
### API Documentation: https://documenter.getpostman.com/view/27606520/2sA35JzKvw
