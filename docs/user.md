# User API Spec

## Register User

Endpoint :

- POST /api/users

Request Body :

```json
{
  "username": "Kartono",
  "password": "rahasia",
  "name": "Kartono Saleh"
}
```

Response (Success) :

```json
{
  "data": {
    "username": "Kartono",
    "name": "Kartono Saleh"
  }
}
```

Response (Failed) :

```json
{
  "errors": "Username tidak boleh kosong"
}
```

## Login User

Endpoint :

- POST /api/users/login

Request Body :

```json
{
  "username": "Kartono",
  "password": "rahasia"
}
```

Response (Success) :

```json
{
  "data": {
    "username": "Kartono",
    "name": "Kartono Saleh",
    "token": "token uuid"
  }
}
```

Response (Failed) :

```json
{
  "errors": "Username atau Password salah"
}
```

## Get User

Endpoint :

- GET /api/users/current

Request Header :

- Authorization : token

Response (Success) :

```json
{
  "data": {
    "username": "Kartono",
    "name": "Kartono Saleh"
  }
}
```

Response (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint :

- PATCH /api/users/current

Request Header :

- Authorization : token

Request Body :

```json
{
  "username": "Kartono", // TIDAK WAJID
  "password": "rahasia" // TIDAK WAJID
}
```

Response (Success) :

```json
{
  "data": {
    "username": "Kartono",
    "name": "Kartono Saleh"
  }
}
```

Response (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint :

- DELETE /api/users/current

Request Header :

- Authorization : token

Response (Success) :

```json
{
  "data": "OK"
}
```

Response (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
