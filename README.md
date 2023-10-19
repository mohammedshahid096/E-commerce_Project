# Ecommerce - Shopping MERN App-webiste
---
## Ecommerce Site :-
##### website link :-
### https://e-commerce-n6r3.onrender.com
##### hosested on Render platform

### Test Examples:-
| variable name | Example |
| ------ | ------ |
| email | shahid@gmail.com |
| password | 123456789 |


---

## Installation :-


1. Clone the Repository First

```sh
git clone https://github.com/mohammedshahid096/E-commerce_Project
```

2. Create a DataBase in the mongodb for locally running the porject 
Database Name : Ecommerce_Project

- there are 2 folders
1- Backend
2- Frontend

3. install the dependencies
- for Backend purpose
```sh
cd Backend
npm install 
```
- for Fontend purpose
```sh
cd Frontend
npm install 
```
## To Start Development :-
### Note : 
- internet is connected initially to start the react server, as there is a "proxy"
- 1st start backend development and then start the 
- need to have a cloudinary Account so that photos can be uploaded on cloudinary 
### Note : before starting  there should be a mongodb Database 
Database Name : Ecommerce_Project

#### Environment Variables :-

To run this project, you will need to add the following environment variables to your .env file
1. env file name "config.env"
2. "config.env" file will be placed in the "Config Folder"
`PORT` = 8000
`DBCONNECTION_URI` = mongodb://localhost:27017/Ecommerce_Project
`DBCONNECTION_URI_ONLINE` = 
`JWT_SECRET` = write_secret_key
`JWT_EXPIRES` = 1d
`COOKIES_EXPIRES` = 1
`CLOUDINARY_NAME` = cloudinary_name
`CLOUDINARY_API_KEY` = api_key
`CLOUDINARY_API_SECRETKEY` = secret_key

### To Start the Servers
Backend Server:
```sh
npm start
```

Frontend Server:

```sh
npm start
```

## Backend :-
### Features

1. **JWT Token Usage:**
   - Upon successful user login or signup, a JSON Web Token (JWT) is generated.
   - The token contains user-specific information and a digital signature for verification.
   - This token is sent to the client and stored in cookies for secure storage.

2. **Cookies for Token Storage:**
   - The JWT token is stored in an HTTP-only cookie.
   - This cookie is sent with each subsequent request to the server, providing user authentication without exposing the token to JavaScript.

3. **Password Hashing with bcrypt:**
   - When users sign up or change their passwords, the provided passwords are not stored in plain text.
   - Instead, they are securely hashed using the bcrypt hashing algorithm before being stored in the database.
   - bcrypt includes a built-in salt mechanism to enhance security.

4. **Authorization:**
   - User actions, such as creating tasks or viewing the task list, are restricted based on user roles and permissions.
   - The JWT token includes information about the user's roles and permissions.
   - Middleware on the server validates the token and checks user permissions before allowing or denying access to specific routes or actions.

5. **Token Expiration and Renewal:**
   - JWT tokens can have expiration times to enhance security.
   - When a token is close to expiration, the client can request a new token using a refresh token.
   - The server verifies the refresh token and issues a new JWT token without requiring the user to log in again.
  


### Libraries Used
    - bcrypt
    - cookie-parser
    - cors
    - dotenv
    - express
    - http-errors
    - jsonwebtoken
    - mongoose
    - validator
    - multer
    





