# retro-board

This is a Retrospective Idea board, powering [retrospected.com](http://www.retrospected.com).

It features the following technologies:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Socket IO](http://socket.io)
* [Webpack](https://github.com/webpack/webpack)
* [Hot-reloading](https://webpack.github.io/docs/hot-module-replacement.html)
* [Material UI design](https://www.google.com/design/spec/material-design/introduction.html)
* [Modular CSS](https://github.com/css-modules/css-modules)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [reselect](https://github.com/reactjs/reselect)
* [Multilingual](https://stackoverflow.com/questions/33413880/react-redux-and-multilingual-internationalization-apps-architecture) / Internationalization
* [NeDB](https://github.com/louischatriot/nedb)
* [ESLint](http://eslint.org/) for JS and JSX
* [Jest](https://facebook.github.io/jest) for Unit Testing


## How to run for production (or to try it out)

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* `npm run build` to build everything (client and server)
* `npm start` to run the server on port 8080
* Open your browser on [http://localhost:8080](http://localhost:8080)


## How to run for development

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* Open another terminal (you need two of those)
* `npm run start-server` on the first terminal to start the server bit
* `npm run start-ui` on the second terminal, to run live webpack with hot-reload
* Open your browser on [http://localhost:8081](http://localhost:8081)


## How to run the tests

* Clone this repository
* `npm i` to install the dependencies (Node 4+, NPM 3+)
* `npm test` to run the tests
* **or** `npm run test-watch` to run the tests every time you change a file