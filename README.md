Pizza Time, Your favorite and most dependable pizza ordering system ever created!

Tech stack
- Typescript with Deno 2
- ExpressJS for the API framework
- Postgres for the database
- Prisma for an ORM
- AuthJS for authentication
- Environmental variable and ? for customer data encryption
- Create React App SPA for client application
- DaisyUI and AceternityUI for a frontend component libraries
- Deno 2 testing tools for tests
- Vercel for hosting

Pizza Time

Your favorite and most dependable pizza ordering system ever created!
Table of Contents

    Introduction
    Tech Stack
    Features
    Setup and Installation
    Deployment Instructions
    Running Tests
    Design Decisions and Assumptions

Introduction

Pizza Time is a comprehensive pizza ordering and management system designed to streamline the process of handling customer orders for pizzerias. It provides an efficient way to view, update, and manage pizza orders, enhancing the overall customer and staff experience.
Tech Stack

    TypeScript with Deno 2
    ExpressJS for the API framework
    PostgreSQL for the database
    Prisma as the ORM
    AuthJS for authentication
    Environment Variables and encryption for customer data security
    Create React App SPA for the client application
    DaisyUI and AceternityUI for frontend component libraries
    Deno 2 Testing Tools for tests
    Vercel for hosting

Features

    Pizza Order Management API: RESTful endpoints to create, read, update, and delete pizza orders.
    Secure Authentication: JWT authentication to secure API endpoints.
    Data Validation: Ensures valid pizza sizes and prevents duplicate orders.
    Data Persistence: Orders and customer information are stored in a PostgreSQL database.
    Data Encryption: Sensitive customer data is encrypted for security.
    Automated Testing: Core functionalities are tested using Deno 2 testing tools.

Setup and Installation
Prerequisites

    Node.js and npm installed
    Deno 2 installed
    PostgreSQL installed and running
    Vercel CLI installed (for deployment)

Installation Steps

    Clone the Repository

    bash

git clone https://github.com/yourusername/pizzatime.git
cd pizzatime

Install Dependencies

bash

npm install

Configure Environment Variables

Create a .env file in the root directory and add the necessary environment variables:

env

DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret_key

Run Database Migrations

bash

npm run migrate

Start the Application

bash

    npm start

    The application should now be running at http://localhost:3000.

Deployment Instructions

To deploy the application on Vercel:

    Fork the Repository

    Fork the repository to your own GitHub account.

    Login to Vercel

    bash

vercel login

Initialize Vercel Project

bash

vercel init

Set Environment Variables on Vercel

In your Vercel dashboard, navigate to your project settings and add the same environment variables as in your .env file.

Deploy

bash

    vercel --prod

    Your application should now be live on Vercel.

Running Tests

To run the automated tests:

bash

npm test

This command will execute all tests located in the tests directory using Deno 2 testing tools.
Design Decisions and Assumptions

    Choice of Tech Stack: Leveraged TypeScript with Deno 2 for improved performance and security. ExpressJS was used for its simplicity and widespread community support.
    Database Selection: Chose PostgreSQL for its reliability and compatibility with Prisma ORM.
    Security Measures: Implemented JWT authentication and encrypted sensitive customer data to adhere to industry-standard security practices.
    Data Validation: Assumed that valid pizza sizes and toppings are predefined and validated against.
    Duplicate Orders: Prevented by checking for existing orders with the same customer information and pizza details.
    Deployment: Used Vercel for its ease of deployment and scalability.

Assumptions Made During Development

    The application is intended for use by a single pizzeria manager.
    All orders are initiated and managed through the provided API endpoints.
    Customers provide necessary contact information for order processing.
    Cancellation of orders is initiated by the customer and processed by the manager.