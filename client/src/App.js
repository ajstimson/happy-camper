import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/checkUser")
      .then((res) => {
        if (res.data.email) {
          setLoggedin(true);
          setUser(res.data);
        } else {
          setLoggedin(false);
          createTempUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const createTempUser = () => {
      axios
        .post("http://localhost:8000/api/users/createTempUser")
        .then((res) => {
          setUser(res.data);
        });
    };
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
