import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRouting from "./Routing/AllRouting";

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <AllRouting />
      </main>
    </div>
  );
};

export default App;
