import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import { BrowserRouter as Router } from "react-router-dom";

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
