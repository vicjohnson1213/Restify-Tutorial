# Restify Tutorial

This is the code repository for the ["Build a RESTful API with Restify and MongoDB"](https://scotch.io/) tutorial (coming soon).

## Installing and Running

To install and run the API, fork and clone the repository then run the following commands:

```bash
# in one shell:
mongod

# in another shell:
npm install
node server.js
```

## The API

### `GET /friends`

Returns an array of all frineds in the database.  If there are no friends in the database, an empty array is returned.

### `GET /friends/:id`

Returns a single friend that matches the specified `id`.  If there is no matching friend, then a `404 Not Found` error is returned.

### `POST /friends`

Creates a new friend in the database and returns a new array of all friends in the database.

Parameters:

| Parameter  | Type   | Required |
| ---------- | ------ | -------- |
| firstName  | String | Yes      |
| lastName   | String | Yes      |
| birthDate  | Date   | Yes      |

### `PUT /friends/:id`

Updates an existing friend that matches the specified `id` and returns the newly created friend.  If there is no matching friend, then a `404 Not Found` error is returned.

Parameters:

| Parameter  | Type   | Required |
| ---------- | ------ | -------- |
| firstName  | String | No       |
| lastName   | String | No       |
| birthDate  | Date   | No       |

### `DELETE /friends/:id`

Deletes an exisitng friend that matches the specified `id` and returns an array of all remaining friends.  If there is no matching friend, then a `404 Not Found` error is returned.

## License

MIT

Copyright (c) 2016 Victor Johnson vicjohnson1213@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.