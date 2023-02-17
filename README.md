# RS-clone-api
Api for Rollong Scopres School task RS-clone


# Usage
 - **[Authorization responses](#authorization-responses)**
 - **[Database responses](#database-responses)**
 - **[Entities additional fields](#entities-additional-fields)**
 - **[Filter entities](#filter-entities)**
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
  - [Get user boards](#get-user-boards)
  - [Get board by id](#get-board-by-id)
  - [Create user board](#create-user-board)
  - [Edit user board](#edit-user-board)
  - [Delete user board](#delete-user-board)
- **Board Users**
  - [Board user entity](#board-user-entity)
  - [Get board users](#get-board-users)
  - [Get board user by id](#get-board-user-by-id)
  - [Create board user](#create-board-user)
  - [Edit board user](#edit-board-user)
  - [Delete board user](#delete-board-user)
- **Board Marks**
  - [Board mark entity](#board-mark-entity)
  - [Get board marks](#get-board-marks)
  - [Get board mark by id](#get-board-mark-by-id)
  - [Create board mark](#create-board-mark)
  - [Edit board mark](#edit-board-mark)
  - [Delete board mark](#delete-board-mark)
- **Board Statuses**
  - [Board status entity](#board-status-entity)
  - [Get board statuses](#get-board-statuses)
  - [Get board status by id](#get-board-status-by-id)
  - [Create board status](#create-board-status)
  - [Edit board status](#edit-board-status)
  - [Delete board status](#delete-board-status)
- **Board Tasks**
  - [Task entity](#board-task-entity)
  - [Get tasks](#get-tasks)
  - [Get taks by id](#get-task-by-id)
  - [Create task](#create-task)
  - [Edit task](#edit-task)
  - [Delete task](#delete-task)
- **Task Attachments**
  - [Task attachment entity](#task-attachment-entity)
  - [Get task attachments](#get-task-attachments)
  - [Get task attachment by id](#get-task-attachment-by-id)
  - [Create task attachment](#create-task-attachment)
  - [Delete taks attachment](#delete-task-attachment)
- **Task Users**
  - [Task user entity](#task-user-entity)
  - [Get task users](#get-task-users)
  - [Get task user by id](#get-task-user-by-id)
  - [Create task suer](#create-task-user)
  - [Edit task user](#edit-task-user)
  - [Delete taks user](#delete-task-user)
- **Task Marks**
  - [Task mark entity](#task-mark-entity)
  - [Get task marks](#get-task-marks)
  - [Get task mark by id](#get-task-mark-by-id)
  - [Create task mark](#create-task-mark)
  - [Edit task mark](#edit-task-mark)
  - [Delete taks mark](#delete-task-mark)
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

#### Board entity:
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
        "required": true,
      },
      "description": {
        "type": "string",
        "example": "board description",
        "required": false,
      }
    }
```

## Route = /boards
#### Get user boards
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        userId
        name
        description
    ```
**Note**: If query parameter userId is not specified, server send boards of user that found in authorization token.
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ board entity }",
        "{ board entity }",
        "{ board entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get user boards" }
    ```
</details>

#### Get board by id
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
    * **[board entity](#board-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such userBoard doesn't exist" }
    ```
</details>

#### Create user board
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
      "name": {
        "type": "string",
        "example": "board name",
        "required": true,
      },
      "description": {
        "type": "string",
        "example": "board description",
        "required": false,
      }
    }
```
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[user entity](#user-entity)**

  **Note** - This request (if succefull) also creates single board user. User id takes from authentification token

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create user board" }
    ```
</details>

#### Edit user board
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[board entity](#board-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[board entity](#board-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such user board does't exist" }
    ```
</details>

#### Delete user board
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
      { "message": "user board deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such user board does't exist" }
    ```
</details>

# Board Users
#### Board user entity:
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
      "role": {
        "type": "enum",
        "possible values" : ["ADMIN", "PARTICIPANT", "VIEWER"],
        "required": true,
      },
    }
```

## Route = /boardUsers
#### Get board users
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        userId
        boardId
        role
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ board user entity }",
        "{ board user entity }",
        "{ board user entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get board users" }
    ```
</details>

#### Get board user by id
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
    * **[board user entity](#board-user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board user doesn't exist" }
    ```
</details>

#### Create board user
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
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
      "role": {
        "type": "enum",
        "possible values" : ["ADMIN", "PARTICIPANT", "VIEWER"],
        "required": true,
      },
    }
```
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[board user entity](#board-user-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create board user" }
    ```
</details>

#### Edit board user
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[board user entity](#board-user-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[board user entity](#board-user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such board user doesn't exist" }
    ```
</details>

#### Delete board user
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
      { "message": "board user deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board user doesn't exist" }
    ```
</details>

# Board Marks
#### Board mark entity:
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
#### Route - /boardMarks
#### Get board marks
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        boardId
        name
        color
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ board mark entity }",
        "{ board mark entity }",
        "{ board mark entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get board marks" }
    ```
</details>

#### Get board mark by id
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
    * **[board mark entity](#board-mark-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board mark doesn't exist" }
    ```
</details>

#### Create board mark
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
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
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[board mark entity](#board-mark-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create board mark" }
    ```
</details>

#### Edit board mark
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[board mark entity](#board-mark-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[board mark entity](#board-mark-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such board mark doesn't exist" }
    ```
</details>

#### Delete board mark
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
      { "message": "board mark deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board mark doesn't exist" }
    ```
</details>



# Board Statuses
#### Board status entity:

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

#### Route - /statuses
#### Get board statuses
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        boardId
        name
        description
        order
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ board status entity }",
        "{ board status entity }",
        "{ board status entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get board statuses" }
    ```
</details>

#### Get board status by id
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
    * **[board status entity](#board-status-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board status doesn't exist" }
    ```
</details>

#### Create board status
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
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
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[board status entity](#board-status-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create board status" }
    ```
</details>

#### Edit board status
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[board status entity](#board-status-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[board status entity](#board-status-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such board status doesn't exist" }
    ```
</details>

#### Delete board status
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
      { "message": "board status deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such board status doesn't exist" }
    ```
</details>

# Board Tasks
#### Board task entity:

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

#### Route - /tasks
#### Get tasks
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        statusId
        name
        description
        order
        done
        startDate
        endDate
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ task entity }",
        "{ task entity }",
        "{ task entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get tasks" }
    ```
</details>

#### Get task by id
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
    * **[task entity](#board-task-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task doesn't exist" }
    ```
</details>

#### Create task
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
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
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[task entity](#board-task-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create task" }
    ```
</details>

#### Edit task
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[task entity](#board-task-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[task entity](#board-task-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such task doesn't exist" }
    ```
</details>

#### Delete task
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
      { "message": "board task deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task doesn't exist" }
    ```
</details>

# Task Attachments
#### Task attachment entity:

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
      "path": {
        "type": "string",
        "example": "test status",
        "required": false,
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
#### Route - /taskAttachments
#### Get task attachments
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        taskId
        name
        path
        type
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ task attachment entity }",
        "{ task attachment entity }",
        "{ task attachment entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get task attachments" }
    ```
</details>

#### Get task attachment by id
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
    * **[task attachment entity](#task-attachment-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "Such task attachment doesn't exist" }
    ```
</details>

#### Create task attachment
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
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
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[task attachment entity](#task-attachment-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "No files were uploaded" }
    ```
  * **Code:** 500
  **Content:** 
    ```json
      { "message": "Can't upload file" }
    ```
</details>


#### Delete task attachment
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
      { "message": "Task attachment deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task attachment doesn't exist" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "Can't access file" }
    ```
</details>

# Task Users
#### Task user entity:
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
      "boardUsersId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```

#### Route - /taskUsers
#### Get task users
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        taskId
        boardUsersid
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ task user entity }",
        "{ task user entity }",
        "{ task suer entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get task users" }
    ```
</details>

#### Get task user by id
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
    * **[task user entity](#task-user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task user doesn't exist" }
    ```
</details>

#### Create task user
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
      "taskId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "boardUsersId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[task user entity](#task-user-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create task user" }
    ```
</details>

#### Edit task user
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[task user entity](#task-user-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[task user entity](#task-user-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such task user doesn't exist" }
    ```
</details>

#### Delete task user
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
      { "message": "task user deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task user doesn't exist" }
    ```
</details>

# Task Marks
#### Task mark entity:

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
      "boardMarkId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```

#### Route - /taskMarks
#### Get task marks
<details>

* **URL** - /
* **Method:** - `GET`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params**
Required: None
Optional:
    ```json
        taskId
        boardMarkId
    ```
* **Data Params**  None
* **Success Response:**
  * **Code:** 200 <br/> 
  **Content:** 
    ```json
      [
        "{ task mark entity }",
        "{ task mark entity }",
        "{ task mark entity }"
      ]
    ```
* **Error Responses:**
  * **Code:** 500 <br/> 
  **Content:** 
    ```json
      { "message": "Server can't get task marks" }
    ```
</details>

#### Get task mark by id
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
    * **[task mark entity](#task-mark-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't sent" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task mark doesn't exist" }
    ```
</details>

#### Create task mark
<details>

* **URL** - /
* **Method:** - `POST`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params:** None
* **Data Params**
```json
    {
      "taskId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
      "boardMarkId": {
        "type": "string",
        "example": "1144e4d3-8d2e-4568-af1a-8e30f1e43bd7",
        "required": true,
      },
    }
```
* **Success Response:**
  * **Code:** 201
  **Content:** 
    * **[task mark entity](#task-mark-entity)**

* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "can't create task mark" }
    ```
</details>

#### Edit task mark
<details>

* **URL** - /
* **Method:** - `PUT`
* **Headers:** Authorization
*  **URL Params:** None
* **Query Params** None
* **Data Params**
  * **[task mark entity](#task-mark-entity)**
* **Success Response:**
  * **Code:** 200 
  **Content:** 
    * **[task mark entity](#task-mark-entity)**
* **Error Responses:**
  * **Code:** 400 
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404 
  **Content:** 
    ```json
      { "message": "such task mark doesn't exist" }
    ```
</details>

#### Delete task mark
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
      { "message": "task mark deleted" }
    ```
* **Error Responses:**
  * **Code:** 400
  **Content:** 
    ```json
      { "message": "id didn't send" }
    ```
  * **Code:** 404
  **Content:** 
    ```json
      { "message": "such task mark doesn't exist" }
    ```
</details>

# Administation

