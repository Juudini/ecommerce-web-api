[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=800&size=52&duration=2500&pause=600&color=1AF7F5&center=true&vCenter=true&repeat=false&random=false&width=1800&lines=PIZZERIA+API++with+Clean+Architecture+DDD+and+Clean+Code)](https://git.io/typing-svg)

#### This project is a Ecommerce application that demonstrates the use of Clean Architecture, Domain-Driven Design (DDD), and Clean Code principles. The application is designed to showcase best practices for building maintainable and scalable software.

<br>

![En Progreso](https://img.shields.io/badge/Status-In%20Progress-yellow)

<details open> 
  <summary><h2>🧩 Languages & Tools</h2></summary>
    
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=typescript,nodejs,express,postgresql,jest,postman,nextjs&perline=9" />
  </a>
</p>
</details>

## Features

-   **Domain-Driven Design (DDD):** The project follows DDD principles by organizing the codebase into clear and well-defined domains, such as "Order," "Customer," and "Menu." Each domain has its own folder structure with distinct responsibilities.

-   **Clean Architecture:** Clean Architecture is implemented to ensure separation of concerns and maintainability. The codebase is divided into layers, including "Application," "Domain," and "Infrastructure," each with a specific role.

-   **Clean Code:** Clean Code principles are applied throughout the project to enhance code readability, maintainability, and testability. Descriptive variable and function names, SOLID principles, and best practices are followed.

-   **Modularity:** The code is organized using barrel files, making it easy to navigate and understand the project structure. This modularity enhances code accessibility and maintainability.

## Project Structure

-   `/src`
    -   `/domain`: The heart of the application, housing the domain model, entities, and core business logic.
    -   `/infrastructure`: Manages infrastructure-related tasks like database access and external service interactions.
    -   `/presentation`: Handles user interfaces and API endpoints for interacting with the application.

## Installation and Configuration

Follow the steps below to set up and run the application in your local environment:

1. Clone this repository to your local machine:

```
git clone https://github.com/Juudini/pizzeria-api.git
```

2. Navigate to the project directory:

```
cd pizzeria-api
```

### Start the Frontend:

1. Install project dependencies:

```
npm i
```

1. Launch server:

```
npm run dev
```

### Start the Backend:

1. Install project dependencies:

```
npm i
```

2. Migrate to initial schema to the database:

```
npx prisma db push
```

3. Launch server:

```
npm run dev
```

Make sure you have the `.env` file in the root folder at /server.

# To access the documentation, open your web browser and enter the following URL:

```
http://localhost:4000/api/docs
```

This will take you to the API documentation, where you can explore the endpoints and learn how to interact with the application.

## 🔗 Links

<a href="https://www.linkedin.com/in/juandebandi/"><img alt="LinkedIn" title="LinkedIn" src="https://custom-icon-badges.demolab.com/badge/-LinkedIn-231b2e?style=for-the-badge&logoColor=F8D866&logo=LinkedIn"/></a>
<a href="https://juandebandi.dev/"><img alt="Portfolio" title="Portfolio" src="https://custom-icon-badges.demolab.com/badge/-|Portfolio-1F222E?style=for-the-badge&logoColor=F8D866&logo=link-external"/></a>
<a href="mailto:juudinidev@gmail.com">
<img src="https://custom-icon-badges.demolab.com/badge/-Email-231b2e?style=for-the-badge&logoColor=F8D866&logo=gmail" alt="Email">
</a>

