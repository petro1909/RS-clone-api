# RS-clone-api
Api for Rollong Scopres School task RS-clone


# Usage
 - **[Authorization responses](#authorization-responses)**
 - **[Database responses](#database-responses)**
 - **[Entities additional fields](#entities-additional-fields)**
 - **[Filer entities](#filter-entities)**
 - **Administation**
  - [Get Users](#admin-get-users)
  - [Get User by id](#admin-get-user)
  - [Create User](#admin-create-user)
  - [Edit user](#admin-edit-user) 
  - [Delete user](#admin-delete-user)
- **Users**
  - [User entity](#user-entity)
  - [Login User](#login-user)
  - [Register User](#register-user) 
  - [Get Users](#get-users)
  - [Get User by id](#get-user-by-id)
  - [Edit user](#edit-user)
- **User Profile Picture**
  - [User profile picture entity](#user-profile-picture-entity)
  - [Get user picture name](#get-user-picture)
  - [Create user picture](#create-user-picture)
  - [Delete user picture](#delete-user-picture)
- **Boards**
  - [Board entity](#board-entity)
  - [Get user boards]()
  - [Get board by id]()
  - [Create user board]()
  - [Edit user board]()
  - [Delete user board]()
- **Board Users**
  - [Board user entity](#board-user-entity)
  - [Get board users]()
  - [Get board user by id]()
  - [Create board user]()
  - [Edit board user]()
  - [Delete board user]()
- **Board Marks**
  - [Board mark entity](#board-mark-entity)
  - [Get board marks]()
  - [Get board mark by id]()
  - [Create board mark]()
  - [Edit board mark]()
  - [Delete board mark]()
- **Board Statuses**
  - [Board status entity](#board-status-entity)
  - [Get board statuses]()
  - [Get board status by id]()
  - [Create board status]()
  - [Edit board status]()
  - [Delete board status]()
- **Board Tasks**
  - [Task entity](#board-task-entity)
  - [Get tasks]()
  - [Get taks by id]()
  - [Create task]()
  - [Edit task]()
  - [Delete task]()
- **Task Attachments**
  - [Task attachment entity](#task-attachment-entity)
  - [Get task attachments]()
  - [Get task attachment by id]()
  - [Create task attachment]()
  - [Edit task attachment]()
  - [Delete taks attachment]()
- **Task Users**
  - [Task user entity](#task-user-entity)
  - [Get task users]()
  - [Get task user by id]()
  - [Create task suer]()
  - [Edit task user]()
  - [Delete taks user]()
- **Task Marks**
  - [Task mark entity](#task-mark-entity)
  - [Get task marks]()
  - [Get task mark by id]()
  - [Create task mark]()
  - [Edit task mark]()
  - [Delete taks mark]()
- **Administration**
  - [Get users]()
  - [Get user by id]()
  - [Edit user]()
  - [Delete user]()


# Authorization Responses
  Besides base route responses, all routes that requires authorization token can send these error responses:
  * **Code:** 401 <br/> 
  **Content:** 
    ```json
      { "message": "no authorization token" }
    ```
  * **Code:** 401 <br/> 
  **Content:** 
    ```json
      { "message": "authorization user not found" }
    ```
# Database Responses
Besides base route responses, all routes can send database error response 
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Database error" }
    ```
# Entities additional fields
Besides entities own fields, each entity has two additional fields: 
```json
      "createdAt": {
        "type": "date",
        "example": "2023-02-15T13:09:03.737Z",
      },
      "updatedAt": {
        "type": "date",
        "example": "2023-02-15T13:09:03.737Z",
      },
```
These fields created automatically after any entity is created. There is no need to create, update, or delete it. You can get them with any entity get request.
# Filer entities
All get requests that get a list of entities, supports several optional query parameters:
```json
page=[integer]
limit=[integer]
sort=[string] - any entity parameter
order=["ASC","DESC"]
```
Sort and order parameters can by multiple but, sort always should be same count as order
# Administation
# Users
### User entity: 
```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "Govard",
        "required": false,
      },
      "email": {
        "type": "string",
        "example": "example@gmail.com",
        "required": true,
      },
      "password": {
        "type": "string",
        "example": "password",
        "required": true,
      },
      "role": {
        "type": "enum",
        "possible values" : ["USER", "ADMIN"],
        "required": true,
      },
      "profilePicture": {
        "type": "string",
        "example" : "photo.jpeg",
        "required": false,
      },
    }
```
### Route = /users
#### Login user
<details>

* **URL** - /login
* **Method:** - `POST`
* **Headers:** None
*  **URL Params:** None
* **Query Params:** None
* **Data Params:**
```json
    {
      "email": {
        "type": "string",
        "example": "example@gmail.com",
        "required": true,
      },
      "password": {
        "type": "string",
        "example": "password",
        "required": true,
      },
    }
```
* **Success Response:**
    * **Code:** 200 <br/> 
    **Content:** 
    ```json
      { 
        "findedUser": "{user instanse}",
        "token": "string",
      }
    ```
* **Error Responses:**
  * **Code:** 400 <br/> 
  **Content:** 
    ```json
      { "message": "email can not be empty" }
    ```
  * **Code:** 400 <br/> 
  **Content:** 
    ```json
      { "message": "password can not be empty" }
    ```
  * **Code:** 404 <br/> 
  **Content:** 
    ```json
      { "message": "login or password not correct" }
    ```
</details>

#### Register user

<details>

* **URL** - /register
* **Method:** - `POST`
* **Headers:** 
  None
*  **URL Params:**
  None
* **Query Params**
    None
* **Data Params**
```json
    {
      "name": {
        "type": "string",
        "example": "Gerbert",
        "required": false,
      },
      "email": {
        "type": "string",
        "example": "example@gmail.com",
        "required": true,
      },
      "password": {
        "type": "string",
        "example": "password",
        "required": true,
      },
    }
```
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[user entity](#user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "email can not be empty" }
    ```
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "password can not be empty" }
    ```
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "user with such email already exist" }
    ```
</details>

#### Get users
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** 
  authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        search[string] - search user by part of email or name 
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{user instanse}",
        "{user instanse}",
        "{user instanse}"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get users" }
    ```
</details>

#### Get user by id

<details>

* **URL** - /:id
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params**

    **Required:**
 
    `id=[string]`
* **Query Params** None
* **Data Params**  None
* **Success Response:**
  * **Code:** 200
  **Content:** 
    * **[user entity](#user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such user doesn't exist" }
    ```
</details>

#### Edit user

<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params** None
* **Query Params** None
* **Data Params** 
```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "Gerbert",
        "required": false,
      },
      "email": {
        "type": "string",
        "example": "example@gmail.com",
        "required": false,
      },
      "password": {
        "type": "string",
        "example": "password",
        "required": false,
      }
    }
```
* **Success Response:**
  * **Code:** 200
  **Content:** 
      * **[user entity](#user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such user doesn't exist" }
    ```
</details>

# User profile picture
### Base route = /users/:id/profilePicture
## User profile picture entity
```json
  {
    "profilePicture": {
        "type": "string",
        "example": "picture.jpg",
        "required": false,
    },
  }
```
#### Get user picture

<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params**

    **Required:**
 
    `id=[string]`
* **Query Params** None
* **Data Params**  None
* **Success Response:**
  * **Code:** 200
  **Content:** 
    ```json
      { "profilePicture": "string"}
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "User doesn't have profile picture" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "Can't access file" }
    ```
</details>

#### Create user picture
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params**

    **Required:**
 
    `id=[string]`
* **Query Params** None
* **Data Params**
```
form-data - <input type="file" name="profile"/>
```

* **Success Response:**
  * **Code:** 200
  **Content:** 
    ```json
      { "profilePicture": "string"}
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "User doesn't have profile picture" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "Can't access file" }
    ```
</details>

#### Delete user picture
<details>

* **URL** - /
* **Method:** - `DELETE`
* **Headers:** Authorization
*  **URL Params**

    **Required:**
 
    `id=[string]`

* **Query Params** None

* **Data Params** None

* **Success Response:**
  * **Code:** 204
  **Content:** 
    ```json
      { "message": "picture deleted" }
    ```
* **Error Responses:**
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "user not found" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "can't delete picture" }
    ```
</details>

# Boards

### Board entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "Test board",
        "required": false,
      },
      "description": {
        "type": "string",
        "example": "example@gmail.com",
        "required": true,
      }
    }
```
</details>

## Route = /boards

# Board Users
### Board user entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "userId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "boardId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

## Route = /boardUsers

# Board Marks
### Board mark entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "mark 1",
        "required": false,
      },
      "color": {
        "type": "string",
        "example": "red",
        "required": false,
      },
      "boardId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Board Statuses
### Board status entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "test status",
        "required": true,
      },
      "description": {
        "type": "string",
        "example": "status description",
        "required": false,
      },
      "order": {
        "type": "number",
        "example": 5,
        "required": true,
      },
      "boardId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Board Tasks
### Board task entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "test status",
        "required": true,
      },
      "description": {
        "type": "string",
        "example": "status description",
        "required": false,
      },
      "order": {
        "type": "number",
        "example": 5,
        "required": true,
      },
      "done": {
        "type": "boolean",
        "example": true,
        "required": false,
      },
      "startDate": {
        "type": "date",
        "example": "2023-02-15T13:09:03.737Z",
        "required": false,
      },
      "endDate": {
        "type": "date",
        "example": "2023-02-15T13:09:03.737Z",
        "required": false,
      },
      "statusId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Task Attachments
### Task attachment entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "name": {
        "type": "string",
        "example": "test status",
        "required": true,
      },
      "type": {
        "type": "enum",
        "values": ["FILE", "HYPERLINK"],
        "required": true,
      },
      "taskId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Task Users
### Task user entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "taskId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "boardUsersid": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Task Marks
### Task mark entity:
---
<details> 

```json
    {
      "id": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "taskId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "boardMarkid": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
</details>

# Administation

