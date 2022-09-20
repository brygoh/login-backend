# Login with Admin Dashboard
It is a web application with supports login and admin dashboard.

# Project Description
Users can login using their google account and only added users that exist in the server can login. There is separation of duties, only admins are able to view the admin dashboard.

This project is built using **NodeJS** and database using **MongoDB**

```
user: {
  email: string
  name: string
  role: string
}
```

# How to Install and Run the Project
- clone the project with:
```
git clone https://github.com/brygoh/login-backend name OR
download zip
```
- open project on Visual Studio Code
- npm install on terminal in main directory
```
npm install
```
- npm start on terminal in main directory
```
nodemon server
```
