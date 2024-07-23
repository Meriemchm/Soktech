# E-Commerce Project Soktech

This is a small, unfinished project for an e-commerce site to publish services or request a service. The backend is built with Laravel, and the frontend is developed using ReactJS. MySQL is used as the database, running on XAMPP in a local environment.

## Information About the team

This project was created by Chami Meriem and Aboura Mohammed Ilyes for our Bachelor's degree. I (Chami Meriem) was responsible for the design and frontend development, while my teammate, Aboura Mohammed Ilyes, handled the backend development.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Composer](https://getcomposer.org/)
- [XAMPP](https://www.apachefriends.org/index.html) (for Apache and MySQL)

## Installation

### Backend (Laravel)

The Laravel backend part was developed by my team. To set it up:

1. Navigate to the project directory:
   ```sh
   cd /path/to/your/laravel/project
   ```

2. Install PHP dependencies using Composer:
   ```sh
   composer install
   ```

3. Link storage:
   ```sh
   php artisan storage:link
   ```

4. Run the Laravel development server:
   ```sh
   php artisan serve
   ```

### Frontend (React)

I am responsible for the ReactJS frontend part. To set it up:

1. Navigate to the frontend directory:
   ```sh
   cd /path/to/your/react/project
   ```

2. Install JavaScript dependencies using npm:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm run dev
   ```

### Database (MySQL with XAMPP)

1. Start Apache and MySQL from XAMPP Control Panel.

2. Create a new database for the project.

3. Configure the database connection in the Laravel `.env` file.

## Running the Project

1. Ensure that both the Laravel backend and React frontend are running.

2. Open your browser and navigate to the Laravel server (typically `http://127.0.0.1:8000`) or the React development server (typically `http://localhost:3000`).

## Additional Information

### Laravel

Laravel is a web application framework with expressive, elegant syntax. It takes the pain out of development by easing common tasks used in many web projects. For more information on Laravel, visit the [Laravel documentation](https://laravel.com/docs).

### React

React is a JavaScript library for building user interfaces. It makes it painless to create interactive UIs. For more information on React, visit the [React documentation](https://reactjs.org/docs/getting-started.html).

