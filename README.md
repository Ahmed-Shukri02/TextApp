# TextApp
Full stack social media app with user authentication/authorisation utilizing the PERN stack. Deployed on Heroku (may take some time to start up)

<h2> Tech Stack </h2>
<div align='center' style='display:flex'>
  <img src='/logos/React-icon.svg' alt='react' style='height: 5em'/>
  <img src='/logos/redux-logo-svgrepo-com.svg' alt='redux' style='height: 5em'/>
  <img src='/logos/Node.js_logo.svg' alt='node' style='height: 5em'/>
  <img src='/logos/expressjs-ar21.svg' alt='express' style='height: 5em'/>
  <img src='/logos/Postgresql_elephant.svg' alt='postgres' style='height: 5em'/>
  
  <img src='/logos/Amazon_Web_Services_Logo.svg' alt='AWS' style='height: 5em'/>
  <img src='/logos/heroku-logo-svgrepo-com.svg' alt='Heroku' style='height: 5em'/>
  <img src='/logos/jest-seeklogo.com.svg' alt='Jest' style='height: 5em'/>
  <img src='/logos/cypress.svg' alt='cypress' style='height: 5em'/>
</div>


</br>



## Features
- Front-End Features
  - Implemented user interface for creating and setting up a user, uploading images, creating posts, replying, liking posts/replies and checking feed.
- Back-End Features
  - Implemented RESTful API to communicate between the client and the PostgreSQL database.
  - Used Amazon Web Service (AWS) S3 Bucket to store user media.
  - Used Json Web Tokens (JWTs) for user Authentication and Authorisation
  - Used password hashing using bcrypt for database storage.
  - Utilized OAuth 2.0 for Google/LinkedIn/Facebook using PassportJs
- Tests
  - Incorporated unit and integration testing using Jest and react-testing-library
  - Implemented End-to-End testing using Cypress, simulating user interaction with posts, replies etc.


</br>


## Using textApp on your local device
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

