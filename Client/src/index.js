import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

  // checks to see if there is a session the express server and then loads a preloaded state
  // with this info. This unfortunately stopped working on heroku due to the way Heroku's
  // server handles persistent memory, but I left it here to show how I was planning to structure
  // the app. I ended up using localStorage as a quick fix.

  let user;
  axios.get('api/session/check')
    .then(res => {
      user = {userId: res.data.userId, firstName: res.data.firstName}
      if (user) {
        axios.get('api/user/findUser', {
        params: {
          id:user.userId
        }
      }).then(res => {
        console.log()

      })
        let preloadedState = {
          session: user
        }
      const store = configureStore(preloadedState);
      ReactDOM.render( 
        <Provider store = {store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>, 
        document.getElementById("root")
      );
      }
     }  
   )

      




    

 