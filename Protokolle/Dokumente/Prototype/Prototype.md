## REST-API

### Table of Contents

- [Authentication](#authentication)
- [Status Codes](#status-codes)
- [Pagination](#pagination)
- Resources
	- [Authenticate](#authenticate)
	- [Users Resource](#users-resource)

### Authentication

All API requests require authentication. The only way to authenticate is a [JSON Web Token](https://jwt.io/)
which has to be contained in every request header except to the `/authenticate` endpoint.

```
Authorization: Bearer <jwt>
```

#### JWT Payload

| Field      | Type              | Description                       |
|------------|-------------------|-----------------------------------|
| id         | integer           | the user's id                     |
| company_id | integer           | the id of the user's company      |
| username   | string            | the user's username, unique       |
| roles      | array of objects  | array of [role](#role) objects    |

### Status Codes

Every response has a specific status according to context and action. This is done so that a caller knows if a request resulted in an error.

| Request type | Status code      | Description                                      |
|--------------|------------------|--------------------------------------------------|
| `GET`        | `200 OK`         | Returns if the resource is successfully created  |
| `POST`       | `201 Created`    | Returns if the resource is successfully accessed |
| `PUT`        | `200 OK`         | Returns if the resource is successfully modified |
| `DELETE`     | `204 No Content` | Returns if the resource was successfully deleted |

The following table shows possible error status codes.

| Status code                 | Description                                                                |
|-----------------------------|----------------------------------------------------------------------------|
| `400 Bad Request`           | A required attribute of the request is missing                             |
| `401 Unauthorized`          | The user is not authenticated, a valid [JWT](#Authentication) is necessary |
| `403 Forbidden`             | The user lacks the required permissions for this request                   |
| `404 Not Found`             | The requested resource couldn't be accessed or is missing                  |
| `409 Conflict`              | A conflicting resource already exists                                      |
| `422 Unprocessable Entity`  | The entity could not be processed due to semantic errors                   |
| `500 Internal Server Error` | While handling the request an unexpected error occur on server-side        |

### Pagination

Sometimes the requested resource is too big to be send in a single response. This is where pagination is used to spilt the resource in pages (just like a book).

#### Request

The following parameters can be used when accessing such resources:

| Parameter  | Description                                          |
|------------|------------------------------------------------------|
| `page`     | Page number (default: `1`)                           |
| `per_page` | Number of items per page (default: `25`, max: `100`) |

The example below lists 3 items on the 2 page.

```
GET https://example.com/api/inventory?per_page=3&page=2
```

#### Response

Each response contains [link headers](https://www.w3.org/wiki/LinkHeader) which have a `rel` set to first/last/prev/next and contain the corresponding URLs. Additional headers containing pagination information are also sent.

| Header          | Description              |
|-----------------|--------------------------|
| `X-Total`       | Total number of items    |
| `X-Total-Pages` | Total number of pages    |
| `X-Per-Page`    | Number of items per page |
| `X-Page`        | Index of current page    |
| `X-Prev-Page`   | Index of previous page   |
| `X-Next-Page`   | Index of next page       |

Example response to the previous request example.

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 967
Content-Type: application/json
Date: Sat, 10 Nov 2018 22:48:51 GMT
Link: <https://example.com/api/inventory?per_page=3&page=1>; rel="first", <https://example.com/api/inventory?per_page=3&page=4>; rel="last", <https://example.com/api/inventory?per_page=3&page=1>; rel="prev", <https://example.com/api/inventory?per_page=3&page=3>; rel="next"
X-Total: 13
X-Total-Pages: 4
X-Per-Page: 3
X-Page: 2
X-Prev-Page: 1
X-Next-Page: 3
```

### Authenticate

```
POST /authenticate
```

Create a new valid JWT. Returns a [jwt](#jwt-payload) on success.

##### JSON Params

| Field    | Type   | Description         |
|----------|--------|---------------------|
| username | string | the user's username |
| password | string | the user's password |

### Company Resource

#### Company Object

| Field  | Type              | Description                       |
|--------|-------------------|-----------------------------------|
| id     | integer           | the company's id                  |
| name   | string            | the user's username, unique       |
| email?     | string            | the user's email, unique          |
| roles      | array of integers | array of [role](#role) object ids |

### Users Resource

#### Usernames

We enforce the following restrictions for usernames:
1. Names can contain most valid [UTF-8](https://en.wikipedia.org/wiki/UTF-8) characters
2. Names must be between 2 and 32 characters long
3. Names are sanitized and trimmed of leading, trailing, and excessive internal whitespace

#### Passwords

We enforce the following restrictions for passwords:
1. Passwords can contain upper-case and lower-case letters, numerical digits, special characters (``~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/``)
2. Passwords must be between 8 and 32 characters long
3. Passwords has to contain at least one upper-case and lower-case letter, one numerical digit and special character

#### User Object

| Field      | Type              | Description                       |
|------------|-------------------|-----------------------------------|
| id         | integer           | the user's id                     |
| company_id | integer           | the id of the user's company      |
| username   | string            | the user's username, unique       |
| email?     | string            | the user's email, unique          |
| roles      | array of integers | array of [role](#role) object ids |

##### Example User Object

```json
{
	"id": 40040,
	"company_id": 2,
	"username": "me11qygu",
	"email": "me11qygu@studserv.uni-leipzig.de",
	"roles": []
}
```

#### Create User

```
POST /users
```

Create a new user. Returns a [user](#user-object) object on success.

##### JSON Params

| Field      | Type   | Description                  |
|------------|--------|------------------------------|
| company_id | int    | the id of the user's company |
| username   | string | the user's username          |
| password   | string | the user's password          |
| email?     | string | the user's email             |

#### Get User

```
GET /users/{user.id}
```

Returns a [user](#user-object) object for a given user ID.

#### Modify User

```
PATCH /users/{user.id}
```

Modify the user with a given user ID. Returns a [user](#user-object) object on success.

##### JSON Params

| Field       | Type   | Description                  |
|-------------|--------|------------------------------|
| company_id? | int    | the id of the user's company |
| username?   | string | the user's username          |
| password?   | string | the user's password          |
| email?      | string | the user's email             |

#### Delete User

```
DELETE /users/{user.id}
```

Deletes the user with a given user ID. Returns a 204 empty response on success.

## Schema

### Company

| Field  | Type        | Note                  |
|--------|-------------|-----------------------|
| **id** | SMALLINT    | PRIMARY KEY           |
| *name* | VARCHAR(64) | UNIQUE INDEX (`name`) |

### Account

| Field           | Type        | Note                         |
|-----------------|-------------|------------------------------|
| **id**          | INT         | PRIMARY KEY                  |
| ***companyId*** | SMALLINT    | FOREIGN KEY (`company`.`id`) |
| *name*          | VARCHAR(64) | UNIQUE INDEX (`name`)        |
| password        | VARCHAR(60) |                              |

### EntityType

| Field  | Type        | Note                  |
|--------|-------------|-----------------------|
| **id** | MEDIUMINT   | PRIMARY KEY           |
| *name* | VARCHAR(64) | UNIQUE INDEX (`name`) |

### EntityTypeField

| Field           | Type        | Note                            |
|-----------------|-------------|---------------------------------|
| **id**          | INT         | PRIMARY KEY                     |
| ***typeId***    | MEDIUMINT   | FOREIGN KEY (`type`.`id`)       |
| *name*          | VARCHAR(64) | UNIQUE INDEX (`typeId`, `name`) |
| type            | VARCHAR(32) | DEFAULT `text`                  |
| required        | BIT         | DEFAULT `0`                     |
| unique          | BIT         | DEFAULT `0`                     |

### Entity:&lt;table_id&gt;

Gets generated for each type where `table_id` is the id of type it represents.
All fields except the id will be auto generated.

| Field  | Type        | Note                  |
|--------|-------------|-----------------------|
| **id** | MEDIUMINT   | PRIMARY KEY           |
| field  | type        | EACH `type_field` WHERE `typeId` == `table_id` |
