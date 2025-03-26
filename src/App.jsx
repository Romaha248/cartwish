import React from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRouting from "./Routing/AllRouting";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <AllRouting />
      </main>
    </div>
  );
};

export default App;
