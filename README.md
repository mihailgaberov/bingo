# Bingo Bigul
Famous Bingo game built with [JavaScript](https://www.javascript.com/). It has a back office app built with [ReactJS](https://reactjs.org/) and [MongoDB](https://www.mongodb.com/) for database.

[![Build Status](https://img.shields.io/travis/mihailgaberov/es6-bingo-game.svg?style=flat-square)](https://travis-ci.org/mihailgaberov/es6-bingo-game)

![Image of the app](https://github.com/mihailgaberov/es6-bingo-game/blob/master/screenshots/login-form.png)

## Running The App

To run the app, follow these steps.

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

4. To run the app, execute the following command:

  ```shell
  gulp
  ```
  
5. To run only the game client + unit tests, execute the following command:

  ```shell
  gulp bingoGame
  ```
  
6. To run only the back office app + unit test for it, execute the following command:

  ```shell
  gulp backOffice
  ```
  
7. To run the server, execute the following command:

  ```shell
  node server.js
  ```
8. To run the e2e tests, execute the following command:

  ```shell
  node nightwatch.js
  ```
9. Browse to [http://localhost:8000](http://localhost:8000) to see the app.
