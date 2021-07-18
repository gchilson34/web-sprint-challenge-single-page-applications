import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Pizza from './pizza';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pizza" id="order-pizza">Order Pizza</Link>
        </li>
      </nav>
      <div className="Home">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pizza" component={Pizza} />
        </Switch>
      </div>
  </Router>
  );
};

export default App;
