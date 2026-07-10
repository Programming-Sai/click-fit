# Click Fit

A one page responsive fitness landing page built as part of a technical assessment.

## Technologies

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery
- jquery-filedrop
- Node.js
- Express
- MySQL

## Features

- Responsive landing page
- jQuery AJAX request to REST API
- Dynamic rendering of product data
- Drag and drop image upload
- Image uploads saved to the upload_images folder
- MySQL users table
- addUser stored procedure

## Installation

### Install dependencies

npm install

### Start the backend

npm start

### Open the frontend

Open index.html in your browser.

### Database

Run the [users.sql](./database/users.sql) script in your MySQL client. The script will:

- Create the `click_fit` database
- Create the `users` table
- Create the `addUser` stored procedure
- Insert a sample user
