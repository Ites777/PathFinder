import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from './store';
import 'react-image-gallery/styles/css/image-gallery.css'
import 'bootstrap/dist/css/bootstrap.min.css';



// axios.defaults.baseURL = "http://127.0.0.1:3000";
// // const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)));

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Provider store={store}>
//       <App />
//       </Provider>
//     </Router>
// import store from './store';

axios.defaults.baseURL = 'http://127.0.0.1:3001'; // ! аналогично в client/constants.js, server/bin/www.js, client/store/cardSlice.js

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
