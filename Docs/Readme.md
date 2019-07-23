Instructions to install and configure any prerequisites or dependencies


## How to run for production (or to try it out)

* Clone this repository
* `npm i` to install the dependencies 
    **** Please use Node V8. This application has NOT been tested on other NodeJS version****
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

Technical design details of the new features implemented
---------------------------------------------------------

Dynamic configuration of board
------------------------------

- Added a tab inside the Landing page called Configure board
- The configure board has options to create new Columns, and choose a color for each
- The initial hard coded columns have not been completely replaced by this dynamic configuration

- For this, a new 'renderConfigureBoardTab' method has been created within Join.jsx
- If a user enters no Question, the default text of 'Add a question' and color of black are Added

- Clicking Save at the end of a configuration saves it to localStorage

Ctrl + Enter to save post
-------------------------

- If the user hits Enter while typing a post, a new line is provided
- Only if the user hits Ctrl+Enter (both Mac OS and Windows) will the post be saved
- Code can be found in EnterInput.jsx

Minify JS during build
---------------------- 

- I have used WebPack's webpack.optimize.UglifyJsPlugin for minifying and obfiscating the JS files on prod build
- For debugging on Production, I have also set sourceMap to true and comments to false for optimizing the build


Assumptions you have made - it is good to explain your thought process and the assumptions you
have made
----------------------------



Any issues you have faced while completing the assignment
---------------------------------------------------------

- The /sagas/router.js file is causing tests to fail. Upon exhaustive debugging, it looks like onLocationChange
    is being exported as undefined into /sagas/index.js. This causes an error in 'redux-saga' during testing, where
    the name of the worker (onLocationChange) is being shown as undefined. I have temporarily renamed the tests folder
    /sagas to prevent this from causing test failure


Any constructive feedback for improving the assignment


