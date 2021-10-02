# GoogleMaps With SearchBox and suggestions
![image](https://user-images.githubusercontent.com/26747366/135729555-ca9045ff-89f4-4b1f-bdec-e7dd3f2fa322.png)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Template: Typescript

- Replace the .env.sample file to .env and add your API Key to make it work: https://developers.google.com/maps/documentation/javascript/get-api-key
- Request to the API has been reduce, by initializing map onces, the searchBox had a 300ms delay after finish writting before it fetch for new suggestions.
- If you click a suggestion it's going to show you the current location and save that position in redux.  


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Launches the test with coverage generator.
See coverage at coverage/lcov-report/index.html, open in browser

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
