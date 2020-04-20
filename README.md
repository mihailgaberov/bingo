# Bingo Bigul
Famous Bingo game built with [JavaScript](https://www.javascript.com/). It has a back office app built with [ReactJS](https://reactjs.org/) and uses [MongoDB](https://www.mongodb.com/) for database.

![Main login screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/main-login-screen.png)
![Lobby screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/lobby-screen.png)
![Start screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/start-screen.png)
![Game screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/game-screen.png)
![Back office login screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-login-screen.png)
![Back office screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-screen.png)
![Back office edit screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-edit-screen.png)
![Discoverer screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/discoverer-screen.png)

## Running The App

To run the app, follow these steps:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
  > **Note:** Gulp must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

4. Make sure you have `.env` file in your main project directory, containing the correct values for the following:

```dotenv
DB_SECRET=<yourdatabasepassword>
DB_URI=mongodb://127.0.0.1/<your database name>
```

5. Make sure you have [MongoDB](https://www.mongodb.com/download-center/community) installed and you are able to use [MongoDB shell version v4.0.0](https://docs.mongodb.com/manual/mongo/index.html)

6. To start MongoDB server, execute the following command:

```
mongod
```

> The default `dbpath` for MongoDB is `/data/db`, which means that if you have installed MongoDB in your `C:\` drive `mongod` will use it implicitly. But if you have your database installed on different path, you need to use `--dbpath=/path/to/your/db` parameter to specify it. It could be for example like this: `mongod --dbpath d:\mongodb\data\db`. For more info on this you may take a look [here](https://docs.mongodb.com/manual/reference/configuration-options/).

7. After you have your database running, you need to start the game server. You can do it by executing the following command in the project main directory:

  ```shell
  node server.js
  ```

8. To run the app, execute the following command:

  ```shell
  gulp
  ```
  
9. To run only the game client + unit tests, execute the following command:

  ```shell
  gulp fe
  ```
  
10. To run only the back office app + unit test for it, execute the following command:

  ```shell
  gulp bo
  ```

11. Browse to [http://localhost:8000](http://localhost:8000) to see the app.


## How to create admin users
I have been receiving queries by several people on how can they create admin users and decided to put the instructions here for anybody who needs them.

First, for anyone who doesn't want to go through all the steps, I am uploading a sample JSON file that you can directly import in your database, in the `admins` collection. The [file](https://github.com/mihailgaberov/bingo/blob/master/admins.sample.json) contains only one user with the following credentials:
```
email: testadmin@bingobigul.com
password: Bingo!@#
```
#### Steps:
1. Start the main app by running 'gulp' in the root directory
2. Start your local mongo instance by running 'mongod' in your terminal
3. Start the game server by running 'node server.js' in the root directory (this assumes you have installed Node.js on your machine)
4. Install Postman or Insomnia (apps for dealing with RESTful APIs) and create a POST request, as it follows:

   URL:  http://localhost:8888/bingo-api/registerAdmin
   
   The body of the request (should be in Form URL Encoded type):
   
 ```
   email: yourdesiredemail@address.com
   
   name: yourdesiredname
   
   password: yourdesiredpassword
```
   
If successful, you should see a generated token in the response, e.g.
 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlkM2MzNWQ4MTQzOTI1YTRmOGMyNjIiLCJlbWFpbCI6InRlc3RhZG1pbkBiaW5nb2JpZ3VsLmNvbSIsIm5hbWUiOiJBZG1pbiIsImV4cCI6MTU4Nzk2NzY2OSwiaWF0IjoxNTg3MzYyODY5fQ.BqDWdeqviG0rtfNoKXarpitylgZm1IcaFA7TfFgfsY4"
}


MIT License

Copyright (c) 2016 - 2020 Mihail Gaberov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
