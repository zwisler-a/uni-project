# Prototype

## REST-API

### Pagination

Sometimes the requested resource is too big to be send in a single response. This is where pagination is used to spilt the resource in pages (just like a book).

#### Request

The following parameters can be used when accessing such resources:

| Parameter  | Description                                          |
| ---------- | :--------------------------------------------------: |
| `page`     | Page number (default: `1`)                           |
| `per_page` | Number of items per page (default: `25`, max: `100`) |

The example below lists 3 items on the 2 page.

```
curl "https://example.com/api/inventory?per_page=3&page=2"
```

#### Response

Each response contains [link headers](https://www.w3.org/wiki/LinkHeader) which have a `rel` set to first/last/prev/next and contain the corresponding URLs. Additional headers containing pagination information are also sent.

| Header          | Description              |
| --------------- | :----------------------: |
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

### Company API

#### List all companies

```
GET /company
```

#### Create a new company

```
POST /company
```

#### Get a single company

```
GET /company/:id
```

#### Edit a company

```
PUT /company/:id
```

#### Delete a company

```
DELETE /company/:id
```

### User API

#### Create a new user

```
POST /user
```

#### Get a single user

```
GET /user/:id
```

#### Edit a user

```
PUT /user/:id
```

#### Delete a user

```
DELETE /user/:id
```

### Location API

#### List all locations

```
GET /location
```

#### Create a new location

```
POST /location
```

#### Get a single location

```
GET /location/:id
```

#### Edit a location

```
PUT /location/:id
```

#### Delete a location

```
DELETE /location/:id
```



## Models

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
