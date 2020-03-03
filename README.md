# The Exchange (Stock Trading App)

[The Exchange](https://young-sands-22656.herokuapp.com/login)

This app allows a user to query real-time stock data and look at their portfolio and previous transactions. **A user must sign-up before being able to purchase stocks.**

## Motivation

This is a sample app that utilizes the MERN stack (**MongoDB, Express, React, Node**) to create a user interface that allows a user to sign-up, login, and begin "buying" stocks with fake currency using a real stocks API: [IEX](https://iexcloud.io/docs/api/)

The stocks the user "buys" will be stored in their profile on MongoDB and then queried in order to display the appropriate user data.

## Installation

There are two folders in the root: Client and Server. You must cd into EACH folder and type:

```bash
npm install
```

This will download the dependencies. 

Important: In order to start this project locally, you must start each server in a separate terminal.

First, cd into the Client and type:
```bash
npm start
```
This will start the react server on port 3000

Then, go into the ROOT StockTradingApp folder and type:
```bash
nodemon start
```

You can then visit <http://localhost:3000/login> and see the app.

NOTE: There are several .env variables present in the app, including the SECRET string to the IEX API and MonogDB database. Therefore, the app will not work as these are necessary for the app to run. You can see the app on Heroku here: 

[The Exchange](https://young-sands-22656.herokuapp.com/login)
## Usage

If you'd like to use this as a boilerplate, you must get your own credentials and make a .env file in the root of this project with the following variables filled:
```bash
MONGO = 
SESSION_SECRET = 
SESSION_NAME = 
NODE_ENV = "development"
IEX_SECRET = ""
```
And then follow the installation instructions above.
## Technologies
**FrontEnd**: React, Redux, BootStrap

**BackEnd**: Node, Express, Mongoose, bcrypt

**DataBase**: MongoDB using MongoDBAtlas

**API's**: [IEX](https://iexcloud.io/docs/api/) Developer API

**Deployed to**: Heroku at <https://young-sands-22656.herokuapp.com/login>



## License
[MIT](https://choosealicense.com/licenses/mit/)



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `nodemon start`

Navigate to root directory of this project and call this to start hot-reload server on [http://localhost:5000](http://localhost:5000)



