import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { axiosCards } from './store/cardSlice';
import Cardlist from './components/Cardlist/Cardlist';
import OneCard from './components/OneCard/OneCard';
import SignIn from "./components/Signin/Signin";
import SignUp from "./components/Signup/Signup";
 import MapContainer from "./components/MapContainer/MapContainer"
import MenuAppBar from './components/Header/Header';
import MainGreeting from "./components/MainGreeting/MainGreeting";
import PrivateRoom from "./components/PrivateRoom/PrivateRoom";
import FindPath from './components/OneCard/FindPath/FindPath';
import { axiosMyCards } from './store/myCardsSlice';

function App() {

  const { status, error } = useSelector(state => state.cards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(axiosCards());
  }, []);
  
  const myCards = useSelector(state => state.myCards);
  React.useEffect(() => {
    dispatch(axiosMyCards());
  }, []);

  return (
    <div>
      <Router>
        <MenuAppBar />
        <Switch>
          <Route exact path="/">
            <MainGreeting />
            <MapContainer />
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
            <Cardlist />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/card/:id">
            <OneCard />
          </Route>
          <Route exact path="/lk">
          <PrivateRoom/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
