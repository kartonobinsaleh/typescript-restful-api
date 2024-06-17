# Contact API Spec

## Create Contact

Endpoint :

- POST /api/contacts

Request Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "Kartono",
  "last_name": "Saleh",
  "email": "kartono@gmail.com",
  "phone": "0888"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Kartono",
    "last_name": "Saleh",
    "email": "kartono@gmail.com",
    "phone": "0888"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "first_name tidak boleh kosong"
}
```

## Get Contact

Endpoint :

- GET /api/contacts/:id

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Kartono",
    "last_name": "Saleh",
    "email": "kartono@gmail.com",
    "phone": "0888"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Kontak tidak ditemukan"
}
```

## Update Contact

Endpoint :

- PUT /api/contacts/:id

Request Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "Kartono",
  "last_name": "Saleh",
  "email": "kartono@gmail.com",
  "phone": "0888"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "Kartono",
    "last_name": "Saleh",
    "email": "kartono@gmail.com",
    "phone": "0888"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "first_name tidak boleh kosong"
}
```

## Delete Contact

Endpoint :

- DELETE /api/contacts/:id

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Kontak tidak ditemukan"
}
```

## Search Contact

Endpoint :

- GET /api/contacts

Query Parameter :

- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Kartono",
      "last_name": "Saleh",
      "email": "kartono@gmail.com",
      "phone": "0888"
    },
    {
      "id": 2,
      "first_name": "Kartono",
      "last_name": "Saleh",
      "email": "kartono@gmail.com",
      "phone": "0888"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
