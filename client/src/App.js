import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({});

  const handleUser = () => {
    axios
      .get("http://localhost:8000/api/users/checkUser", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res);
        setLoggedin(true);
      })
      .catch((err) => {
        err.response.status === 401 ? createTempUser() : console.log(err);
      });
  };

  const createTempUser = () => {
    console.log("createTempUser");
    axios
      .post("http://localhost:8000/api/users/createTempUser", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  };

  useEffect(() => {
    handleUser();
  }, []);

  console.log("user", user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header page="Home" loggedin={loggedin} />
                <Hero />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
