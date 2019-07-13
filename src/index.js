import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";


import './bulma.css';
import "./index.css";
import App from "./App";

function Wrapper(props) {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));