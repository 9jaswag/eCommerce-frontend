import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Routes from "./routes";

import "./App.css";

toast.configure();

function App() {
  return <>{Routes}</>;
}

export default App;
