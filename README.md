# Library Management System - Full Stack Project

This comprehensive library management system serves both users and administrators. The front-end is built with React, Redux, and Mantine, while the back-end uses Spring Boot for RESTful APIs. Both the front-end and back-end are integrated to provide a complete library management experience.

Link to website: [https://phuongnh-library.netlify.app/](https://phuongnh-library.netlify.app/)

> **Warning**
> Currently, the system is running on free hosting services (Netlify & Render) so the speed might be slow. In addition, the backend will close down when there is inactivity for a while so it might take some time to fetch the data when first using the website. For more information on backend start up, you can go to [https://lib-sys-backend.onrender.com](https://lib-sys-backend.onrender.com) to check its status, the server will respond with a 200 status and the text "Ok" when the backend is operational.

![Library Management System Screenshot](public/screenshot.png)

## Features

- User registration and login with secure JWT authentication
- Browsing and searching for books
- Viewing book details and author information
- Borrowing, reserving, and returning books
- Adding favorite books and managing personal virtual bookshelves
- Updating user account information
- Admin dashboard for managing users, books, authors, and categories

## Tech Stack

- [React](https://reactjs.org/) - UI library for building component-based user interfaces
- [Redux](https://redux.js.org/) - State management library for maintaining and scaling application state
- [Mantine](https://mantine.dev/) - React components and hooks library for building modern web applications
- [Spring Boot](https://spring.io/projects/spring-boot) - Back-end framework for creating stand-alone, production-grade applications that you can "just run"
- [JWT](https://jwt.io/) - For secure transmission of information between parties as a JSON object

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

``` {.sourceCode .bash}
git clone https://github.com/phuong-nh/lib-manage-sys-frontend.git
cd lib-manage-sys-frontend
```

2.  Install dependencies:

`yarn install`

3.  Start the development server:

`npm run dev`

4.  Open your browser and navigate to [http://localhost:5173](http://localhost:5173/) to view the application.

## Project Structure

- `src/`
  - `components/` - Reusable components used across the application
  - `constants/` - Constants used across the application
  - `features`: Contains feature-specific code, such as Redux slices and thunks, and feature-specific components.
  - `pages/` - Main pages of the application, such as the homepage, user dashboard, and admin dashboard
  - `redux/` - Redux store configuration, reducers, and actions
  - `types/` - TypeScript interfaces for data types, such as books, authors, and users
  - `utils/` - Utility functions
  - `App.tsx` - Main application component
  - `index.tsx` - Entry point of the application

## Back-End Project

The back-end project can be found [here](https://github.com/phuong-nh/lib-manage-sys-backend).
