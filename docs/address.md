# Address API Spec

## Create Address

Endpoint :

- POST /api/contacts/:idContact/addresses

Request Header :

- Authorization : token

Request Body :

```json
{
  "street": "Jl. Cibarusah",
  "city": "Bekasi",
  "province": "Jawa Barat",
  "country": "Indonesia",
  "postal_code": "4040"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Cibarusah",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "country": "Indonesia",
    "postal_code": "4040"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "postal_code is required"
}
```

## Get Address

Endpoint :

- GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Cibarusah",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "country": "Indonesia",
    "postal_code": "4040"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Address tidak ditemukan"
}
```

## Update Address

Endpoint :

- PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :

- Authorization : token

Request Body :

```json
{
  "street": "Jl. Cibarusah",
  "city": "Bekasi",
  "province": "Jawa Barat",
  "country": "Indonesia",
  "postal_code": "4040"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Cibarusah",
    "city": "Bekasi",
    "province": "Jawa Barat",
    "country": "Indonesia",
    "postal_code": "4040"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "postal_code is required"
}
```

## Remove Address

Endpoint :

- DELETE /api/contacts/:idContact/addresses/:idAddress

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
  "errors": "Address tidak ditemukan"
}
```

## List Address

Endpoint :

- GET /api/contacts/:idContact/addresses

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl. Cibarusah",
      "city": "Bekasi",
      "province": "Jawa Barat",
      "country": "Indonesia",
      "postal_code": "4040"
    },
    {
      "id": 2,
      "street": "Jl. Cibarusah",
      "city": "Bekasi",
      "province": "Jawa Barat",
      "country": "Indonesia",
      "postal_code": "4040"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact tidak ditemukan"
}
```
