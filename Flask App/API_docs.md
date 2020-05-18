
# FLASK



## Indices

* [Administration](#administration)

  * [List All Users](#1-list-all-users)

* [Authentication](#authentication)

  * [Add User](#1-add-user)
  * [My Details](#2-my-details)
  * [Login](#3-login)
  * [Change User Details](#4-change-user-details)

* [Modules/Dashboard](#modulesdashboard)

  * [User's Tasks](#1-user's-tasks)
  * [Task Results](#2-task-results)


--------


## Administration



### 1. List All Users



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/users
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | jwt {{jwt}} |  |



## Authentication



### 1. Add User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/addUser
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name": "Akash Ravi",
    "email": "akashkravi@gmail.com",
    "password": "qwertyuiop",
    "role": "su",
    "company": "Cisco",
    "location": "Bangalore"
}
```



### 2. My Details



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |
| Authorization | JWT  {{jwt}} |  |



### 3. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/auth
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "username": "akashkravi@gmail.com",
    "password": "qwertyuiop"
}
```



### 4. Change User Details



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/changeUser
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | jwt {{jwt}} |  |
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name": "Nandan"
}
```



## Modules/Dashboard



### 1. User's Tasks



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/modules/mytask
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | jwt {{jwt}} |  |



### 2. Task Results



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/modules/task/7
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | jwt {{jwt}} |  |




---
[Back to top](#FLASK)
