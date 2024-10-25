# Pizza Time

Your favorite and most dependable pizza ordering system ever created!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Deployment Instructions](#deployment-instructions)
- [Running Tests](#running-tests)
- [Design Decisions and Assumptions](#design-decisions-and-assumptions)
- [Scalability Considerations](#scalability-considerations)

## Introduction

Pizza Time is a comprehensive pizza ordering and management system designed to streamline the process of handling customer orders for pizzerias. It provides an efficient way to view, update, and manage pizza orders, enhancing the overall customer and staff experience.

This project is developed as a part of the Senior Backend Developer Work Sample to demonstrate the ability to build and deploy scalable, maintainable backend systems, focusing on real-world problem-solving.

## Features

- **Pizza Order Management API**: RESTful endpoints to create, read, update, and delete pizza orders.
  - **List Orders**: View all pizza orders with details like pizza type, toppings, and status.
  - **Add Order**: Create a new order with customer information and pizza details.
  - **Update Order**: Modify an existing order's status or pizza details.
  - **Delete Order**: Remove an order if the customer cancels it.
- **Data Validation**: Ensures valid pizza sizes and prevents duplicate orders.
- **Data Persistence**: Orders and customer information are stored in a PostgreSQL database.
- **Security**: Implements JWT authentication and encrypts sensitive customer data.
- **Automated Testing**: Core functionalities are tested using Jest testing tools.

## Tech Stack

- **TypeScript**: For type-safe JavaScript development.
- **ExpressJS**: As the web application framework.
- **PostgreSQL**: For the relational database.
- **Prisma**: As the ORM (Object-Relational Mapping) tool.
- **JWT**: For secure authentication and authorization.
- **Crypto-JS**: For encrypting sensitive data.
- **Jest**: For running unit and integration tests.
- **Vercel**: For hosting the application.

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** installed
- **PostgreSQL** installed and running
- **Vercel CLI** installed (for deployment)

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/pizzatime.git
cd pizzatime
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**

```bash
SHARED_SECRET=""
ENCRYPTION_KEY=""
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
ENV=""
```

4. **Run Database Migrations**
```bash
npx prisma migrate dev --name init --schema ./src/services/prisma/schema.prisma
```

5. **Start the Application**
```bash
npm run api
```

### Running Tests

To run the automated tests:
```bash
npm run test
```

## Design Decisions and Assumptions
---

Pizza Order Management: Implemented RESTful API endpoints to fulfill all CRUD operations as per requirements.

Software Design: Followed an MVC pattern, leveraging “fat” models and “skinny” controllers.

Data Validation: Middleware validates incoming data, ensuring pizza sizes and toppings are valid and preventing duplicate orders.

Data Persistence: Chose PostgreSQL for reliable data storage and Prisma ORM for efficient database interactions.

Security:
- Implemented JWT authentication to secure API endpoints.
- Used crypto-js to encrypt sensitive customer data like phone numbers and addresses.

Testing: Utilized Jest for unit and integration tests covering core functionalities like creating, updating, and listing orders.

Deployment: Deployed on Vercel for ease of access and scalability.

## Scalability Considerations
---

For a fully scalable system, the following improvements could be implemented:

Pagination: Implement paginated endpoints for collections.

User Authentication: Add a user management system to better support roles and permissions.

Extended Testing: Include integration tests that validate end-to-end interactions.

Controller and Route Separation: Separate routing from controller logic for modularity, scalability, and maintainability.