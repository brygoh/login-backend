# Tech-Stack

NodeJS / MongoDB

# Overview

Simple backend that stores user data on MongoDB. Able to add, edit and delete.<br/>
```
Schema: {
  email: string
  name: string
  role: string
}
```

# Description

Used Google Client API to authenticate valid Google Account <br />
Used MongoDB to authenticate users' role by: useState, useEffect, axios.get... etc

- Users have two roles: Admin and Normal (Non-Admin)
- Webpage supposedly has successful login landing page for both admin and non admin users
- Webpage supposedly has login failure login landing page for both admin and non admin users

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
